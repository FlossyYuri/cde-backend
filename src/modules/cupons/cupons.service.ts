import { Inject, Injectable } from '@nestjs/common';
import { CUPON_REPOSITORY } from 'src/core/constants';
import { CuponDto } from './dto/cupon.dto';
import { Cupon } from './cupon.entity';

@Injectable()
export class CuponsService {
  constructor(
    @Inject(CUPON_REPOSITORY)
    private readonly cuponRepository: typeof Cupon,
  ) {}

  async create(cupon: CuponDto): Promise<Cupon> {
    cupon.code = this.code_generator(12);
    const currentDate = new Date();
    cupon.expiresAt = new Date(
      currentDate.getFullYear() + 1,
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    console.log(cupon.code);
    return await this.cuponRepository.create<Cupon>(cupon);
  }

  async findAll(): Promise<Cupon[]> {
    return await this.cuponRepository.findAll<Cupon>();
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
