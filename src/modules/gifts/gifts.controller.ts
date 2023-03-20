import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Gift as GiftEntity } from './gift.entity';
import { GiftsService } from './gifts.service';
import { GiftDto, UpdateGiftDto } from './dto/gift.dto';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftService: GiftsService) {}

  @Get()
  async findAll() {
    // get all gifts in the db
    return await this.giftService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<GiftEntity> {
    // find the gift with this id
    const gift = await this.giftService.findOne(id);

    // if the gift doesn't exit in the db, throw a 404 error
    if (!gift) {
      throw new NotFoundException("This Gift doesn't exist");
    }

    // if gift exist, return the gift
    return gift;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() gift: GiftDto): Promise<GiftEntity> {
    // create a new gift and return the newly created gift
    return await this.giftService.create(gift);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() gift: UpdateGiftDto,
  ): Promise<GiftEntity> {
    // get the number of row affected and the updated gift
    const { numberOfAffectedRows, updatedGift } = await this.giftService.update(
      id,
      gift,
    );

    // if the number of row affected is zero,
    // it means the gift doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Gift doesn't exist");
    }

    // return the updated gift
    return updatedGift;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    // delete the gift with this id
    const deleted = await this.giftService.delete(id);

    // if the number of row affected is zero,
    // then the gift doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Gift doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
