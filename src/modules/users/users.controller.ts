import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/user.dto';
import { User as UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    // get all users in the db
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    // find the user with this id
    const user = await this.userService.findOne(id);

    // if the user doesn't exit in the db, throw a 404 error
    if (!user) {
      throw new NotFoundException("This User doesn't exist");
    }

    // if user exist, return the user
    return user;
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // async create(@Body() user: UserDto): Promise<UserEntity> {
  //   // create a new user and return the newly created user
  //   return await this.userService.create(user);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<UserEntity> {
    // get the number of row affected and the updated user
    const { numberOfAffectedRows, updatedUser } = await this.userService.update(
      id,
      user,
    );

    // if the number of row affected is zero,
    // it means the user doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This User doesn't exist");
    }

    // return the updated user
    return updatedUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    // delete the user with this id
    const deleted = await this.userService.delete(id);

    // if the number of row affected is zero,
    // then the user doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This User doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
