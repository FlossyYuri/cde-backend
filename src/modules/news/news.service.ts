import { Inject, Injectable } from '@nestjs/common';
import { NEWS_REPOSITORY } from 'src/core/constants';
import { NewsDto } from './dto/new.dto';
import { New } from './new.entity';

@Injectable()
export class NewsService {
  constructor(
    @Inject(NEWS_REPOSITORY)
    private readonly questionRepository: typeof New,
  ) {}

  async create(news: NewsDto): Promise<New> {
    return await this.questionRepository.create<New>(news);
  }

  async findAll(): Promise<New[]> {
    return await this.questionRepository.findAll<New>();
  }

  async findOne(id: number): Promise<New> {
    return await this.questionRepository.findOne<New>({ where: { id } });
  }

  async delete(id) {
    return await this.questionRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedNews]] =
      await this.questionRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedNews };
  }
}
