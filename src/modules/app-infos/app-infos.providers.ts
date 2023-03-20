import { APP_INFO_REPOSITORY } from '../../core/constants';
import { AppInfo } from './app-info.entity';

export const AppInfosProviders = [
  {
    provide: APP_INFO_REPOSITORY,
    useValue: AppInfo,
  },
];
