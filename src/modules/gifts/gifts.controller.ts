import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Gift as GiftEntity } from './gift.entity';
import { GiftsService } from './gifts.service';
import { GiftDto, UpdateGiftDto } from './dto/gift.dto';
import { PaginationOptions } from 'src/utils/pagination.util';

export interface GiftFilterOptions extends PaginationOptions {
  colected?: boolean;
  user_id?: number;
}

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftService: GiftsService) {}

  @Get()
  async findAll(@Query() query: GiftFilterOptions) {
    return await this.giftService.findAll(query);
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
