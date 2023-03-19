import { SUBJECT_REPOSITORY } from '../../core/constants';
import { Subject } from './subject.entity';

export const SubjectsProviders = [
  {
    provide: SUBJECT_REPOSITORY,
    useValue: Subject,
  },
];
