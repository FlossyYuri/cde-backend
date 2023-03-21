import { ALTERNATIVE_REPOSITORY } from '../../core/constants';
import { Alternative } from './alternative.entity';

export const AlternativesProviders = [
  {
    provide: ALTERNATIVE_REPOSITORY,
    useValue: Alternative,
  },
];
