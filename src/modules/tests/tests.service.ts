import { Inject, Injectable } from '@nestjs/common';
import { TEST_REPOSITORY } from 'src/core/constants';
import { QuestionTestService } from '../question-test/question-test.service';
import { Question } from '../questions/question.entity';
import { TestDto, UpdateTestDto } from './dto/test.dto';
import { Test } from './test.entity';

@Injectable()
export class TestsService {
  constructor(
    @Inject(TEST_REPOSITORY)
    private readonly testRepository: typeof Test,
    private questionTestService: QuestionTestService,
  ) {}

  async create(test: TestDto): Promise<Test> {
    const newTest = await this.testRepository.create<Test>(test);

    await Promise.all(
      test.questionsIdList.map((question_id) => {
        return this.questionTestService.create({
          question_id: question_id,
          test_id: newTest.id,
        });
      }),
    );
    return this.findOne(newTest.id);
  }

  async findAll(): Promise<Test[]> {
    return await this.testRepository.findAll<Test>({
      include: Question,
    });
  }

  async findOne(id: number): Promise<Test> {
    return await this.testRepository.findOne<Test>({
      where: { id },
      include: Question,
    });
  }

  async delete(id) {
    return await this.testRepository.destroy({ where: { id } });
  }

  async update(id, data: UpdateTestDto) {
    const currentQuestions = await (
      await this.questionTestService.findByTest(id)
    ).map((item) => item.question_id);
    const newQuestions = await (await data.questionsIdList).map((item) => item);
    const all = new Set([...newQuestions, ...currentQuestions]);
    const promisses = [];
    all.forEach(async (item) => {
      if (newQuestions.includes(item)) {
        if (!currentQuestions.includes(item)) {
          promisses.push(
            this.questionTestService.create({
              question_id: item,
              test_id: id,
            }),
          );
        }
      } else if (currentQuestions.includes(item)) {
        promisses.push(this.questionTestService.delete(item, id));
      }
    });
    await Promise.all(promisses);
    return this.findOne(id);
  }
}
