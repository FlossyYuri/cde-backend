import { Inject, Injectable } from '@nestjs/common';
import { QUESTION_REPOSITORY } from 'src/core/constants';
import { Alternative } from '../alternatives/alternative.entity';
import { AlternativesService } from '../alternatives/alternatives.service';
import { QuestionDto, UpdateQuestionDto } from './dto/question.dto';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(QUESTION_REPOSITORY)
    private readonly questionRepository: typeof Question,
    private alternativeService: AlternativesService,
  ) {}

  async create(question: QuestionDto): Promise<Question> {
    const newQuestion = await this.questionRepository.create<Question>(
      question,
    );

    await Promise.all(
      question.alternativas.map((alternative) => {
        return this.alternativeService.create({
          text: alternative,
          question_id: newQuestion.id,
        });
      }),
    );
    return this.findOne(newQuestion.id);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.findAll<Question>({
      include: Alternative,
    });
  }

  async findOne(id: number): Promise<Question> {
    return await this.questionRepository.findOne<Question>({
      where: { id },
      include: Alternative,
    });
  }

  async delete(id) {
    return await this.questionRepository.destroy({ where: { id } });
  }

  async update(id, data: UpdateQuestionDto) {
    await Promise.all(
      data.alternativesList.map((alternative) => {
        return this.alternativeService.update(alternative.id, alternative);
      }),
    );
    await this.questionRepository.update(
      { ...data },
      { where: { id }, returning: true },
    );

    return this.findOne(id);
  }
}
