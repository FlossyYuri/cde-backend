import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { QUESTION_TEST_REPOSITORY } from 'src/core/constants';
import { QuestionTestDto } from './dto/question-test.dto';
import { QuestionTest } from './question-test.entity';

@Injectable()
export class QuestionTestService {
  constructor(
    @Inject(QUESTION_TEST_REPOSITORY)
    private readonly questionTestRepository: typeof QuestionTest,
  ) {}

  async create(questionTest: QuestionTestDto): Promise<QuestionTest> {
    try {
      return await this.questionTestRepository.create<QuestionTest>(
        questionTest,
      );
    } catch (error) {
      throw new BadRequestException('Error creating a test question', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async findAll(): Promise<QuestionTest[]> {
    return await this.questionTestRepository.findAll<QuestionTest>();
  }

  async findOne(question_id: number, test_id: number): Promise<QuestionTest> {
    return await this.questionTestRepository.findOne<QuestionTest>({
      where: { question_id, test_id },
    });
  }
  async findByTest(test_id: number): Promise<QuestionTest[]> {
    return this.questionTestRepository.findAll<QuestionTest>({
      where: { test_id },
    });
  }

  async delete(question_id: number, test_id: number) {
    return await this.questionTestRepository.destroy({
      where: { question_id, test_id },
    });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedQuestionTest]] =
      await this.questionTestRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedQuestionTest };
  }
}
