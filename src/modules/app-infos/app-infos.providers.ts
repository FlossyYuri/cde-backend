import { AppInfo_REPOSITORY } from '../../core/constants';
import { AppInfo } from './app-info.entity';

export const AppInfosProviders = [
  {
    provide: AppInfo_REPOSITORY,
    useValue: AppInfo,
  },
];
