import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaginationOptions } from 'src/utils/pagination.util';
import { UpdateUserDto } from './dto/user.dto';
import { User as UserEntity } from './user.entity';
import { UsersService } from './users.service';

export interface UserFilterOptions extends PaginationOptions {
  username?: string;
  email?: string;
  phone?: string;
  role?: string;
  premium?: boolean;
}

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(@Query() query: UserFilterOptions) {
    console.log(query);
    return await this.userService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException("This User doesn't exist");
    }

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
    const { numberOfAffectedRows, updatedUser } = await this.userService.update(
      id,
      user,
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This User doesn't exist");
    }

    return updatedUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.userService.delete(id);
    if (deleted === 0) {
      throw new NotFoundException("This User doesn't exist");
    }

    return 'Successfully deleted';
  }
}
