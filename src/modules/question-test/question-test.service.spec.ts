import { Test, TestingModule } from '@nestjs/testing';
import { QuestionTestService } from './question-test.service';

describe('QuestionTestService', () => {
  let service: QuestionTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionTestService],
    }).compile();

    service = module.get<QuestionTestService>(QuestionTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
