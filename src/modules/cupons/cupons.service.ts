import { Inject, Injectable } from '@nestjs/common';
import { CUPON_REPOSITORY } from 'src/core/constants';
import { CuponDto } from './dto/cupon.dto';
import { Cupon } from './cupon.entity';
import { addYear } from 'src/utils';
import { CuponFilterOptions } from './cupons.controller';
import { PaginatedData, paginationBuilder } from 'src/utils/pagination.util';

@Injectable()
export class CuponsService {
  constructor(
    @Inject(CUPON_REPOSITORY)
    private readonly cuponRepository: typeof Cupon,
  ) {}

  async create(cupon: CuponDto): Promise<Cupon> {
    cupon.code = this.code_generator(12);
    cupon.expiresAt = addYear(new Date());
    return await this.cuponRepository.create<Cupon>(cupon);
  }

  async findAll({
    page = 1,
    size = 10,
    ...rest
  }: CuponFilterOptions): Promise<PaginatedData<Cupon>> {
    return await paginationBuilder(this.cuponRepository, {
      page,
      size,
      options: {
        where: { ...rest },
      },
    });
  }

  async findOne(code: string): Promise<Cupon> {
    return await this.cuponRepository.findOne<Cupon>({ where: { code } });
  }

  async delete(code) {
    return await this.cuponRepository.destroy({ where: { code } });
  }

  async update(code, data) {
    const [numberOfAffectedRows, [updatedCupon]] =
      await this.cuponRepository.update(
        { ...data },
        { where: { code }, returning: true },
      );

    return { numberOfAffectedRows, updatedCupon };
  }
  code_generator(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
