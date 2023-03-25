import { Inject, Injectable } from '@nestjs/common';
import { GIFTS_REPOSITORY } from 'src/core/constants';
import { addYear } from 'src/utils';
import { PaginatedData, paginationBuilder } from 'src/utils/pagination.util';
import { GiftDto } from './dto/gift.dto';
import { Gift } from './gift.entity';
import { GiftFilterOptions } from './gifts.controller';

@Injectable()
export class GiftsService {
  constructor(
    @Inject(GIFTS_REPOSITORY)
    private readonly giftRepository: typeof Gift,
  ) {}

  async create(gift: GiftDto): Promise<Gift> {
    gift.expiresAt = addYear(new Date());
    return await this.giftRepository.create<Gift>(gift);
  }

  async findAll({
    page = 1,
    size = 10,
    ...rest
  }: GiftFilterOptions): Promise<PaginatedData<Gift>> {
    return await paginationBuilder(this.giftRepository, {
      page,
      size,
      options: {
        where: { ...rest },
      },
    });
  }
  async findOne(id: number): Promise<Gift> {
    return await this.giftRepository.findOne<Gift>({ where: { id } });
  }

  async delete(id) {
    return await this.giftRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedGift]] =
      await this.giftRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedGift };
  }
}
