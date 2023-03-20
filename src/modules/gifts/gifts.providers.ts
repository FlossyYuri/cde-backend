import { GIFTS_REPOSITORY } from '../../core/constants';
import { Gift } from './gift.entity';

export const GiftsProviders = [
  {
    provide: GIFTS_REPOSITORY,
    useValue: Gift,
  },
];
