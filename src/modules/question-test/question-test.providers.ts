import { QUESTION_TEST_REPOSITORY } from '../../core/constants';
import { QuestionTest } from './question-test.entity';

export const QuestionTestsProviders = [
  {
    provide: QUESTION_TEST_REPOSITORY,
    useValue: QuestionTest,
  },
];
