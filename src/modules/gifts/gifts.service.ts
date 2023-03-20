import { Inject, Injectable } from '@nestjs/common';
import { GIFTS_REPOSITORY } from 'src/core/constants';
import { addYear } from 'src/utils';
import { GiftDto } from './dto/gift.dto';
import { Gift } from './gift.entity';

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

  async findAll(): Promise<Gift[]> {
    return await this.giftRepository.findAll<Gift>();
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
