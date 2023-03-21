import { Inject, Injectable } from '@nestjs/common';
import { ALTERNATIVE_REPOSITORY } from 'src/core/constants';
import { Alternative } from './alternative.entity';
import { AlternativeDto } from './dto/alternative.dto';

@Injectable()
export class AlternativesService {
  constructor(
    @Inject(ALTERNATIVE_REPOSITORY)
    private readonly alternativeRepository: typeof Alternative,
  ) {}

  async create(alternative: AlternativeDto): Promise<Alternative> {
    return await this.alternativeRepository.create<Alternative>(alternative);
  }

  async findAll(): Promise<Alternative[]> {
    return await this.alternativeRepository.findAll<Alternative>();
  }

  async findOne(id: number): Promise<Alternative> {
    return await this.alternativeRepository.findOne<Alternative>({
      where: { id },
    });
  }

  async delete(id) {
    return await this.alternativeRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedAppInfo]] =
      await this.alternativeRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedAppInfo };
  }
}
