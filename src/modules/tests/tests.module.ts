import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { TestsProviders } from './tests.providers';
import { QuestionTestService } from '../question-test/question-test.service';
import { QuestionTestsProviders } from '../question-test/question-test.providers';

@Module({
  providers: [
    TestsService,
    QuestionTestService,
    ...TestsProviders,
    ...QuestionTestsProviders,
  ],
  controllers: [TestsController],
})
export class TestsModule {}
