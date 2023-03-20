import { CUPON_REPOSITORY } from '../../core/constants';
import { Cupon } from './cupon.entity';

export const CuponsProviders = [
  {
    provide: CUPON_REPOSITORY,
    useValue: Cupon,
  },
];
