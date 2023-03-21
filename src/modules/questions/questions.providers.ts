import { QUESTION_REPOSITORY } from '../../core/constants';
import { Question } from './question.entity';

export const QuestionsProviders = [
  {
    provide: QUESTION_REPOSITORY,
    useValue: Question,
  },
];
