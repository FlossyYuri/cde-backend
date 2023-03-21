import { Module } from '@nestjs/common';
import { QuestionTestsProviders } from './question-test.providers';
import { QuestionTestService } from './question-test.service';

@Module({
  providers: [QuestionTestService, ...QuestionTestsProviders],
})
export class QuestionTestModule {}
