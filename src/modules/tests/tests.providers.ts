import { TEST_REPOSITORY } from '../../core/constants';
import { Test } from './test.entity';

export const TestsProviders = [
  {
    provide: TEST_REPOSITORY,
    useValue: Test,
  },
];
