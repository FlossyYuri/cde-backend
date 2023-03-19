import { NEWS_REPOSITORY } from '../../core/constants';
import { New } from './new.entity';

export const NewsProviders = [
  {
    provide: NEWS_REPOSITORY,
    useValue: New,
  },
];
