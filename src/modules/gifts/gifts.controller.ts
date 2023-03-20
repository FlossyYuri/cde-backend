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
    return await this.giftService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<GiftEntity> {
    const gift = await this.giftService.findOne(id);
    if (!gift) {
      throw new NotFoundException("This Gift doesn't exist");
    }
    return gift;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() gift: GiftDto): Promise<GiftEntity> {
    return await this.giftService.create(gift);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() gift: UpdateGiftDto,
  ): Promise<GiftEntity> {
    const { numberOfAffectedRows, updatedGift } = await this.giftService.update(
      id,
      gift,
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Gift doesn't exist");
    }

    return updatedGift;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.giftService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException("This Gift doesn't exist");
    }

    return 'Successfully deleted';
  }
}
