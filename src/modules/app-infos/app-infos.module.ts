import { Module } from '@nestjs/common';
import { AppInfosService } from './app-infos.service';
import { AppInfosController } from './app-infos.controller';
import { AppInfosProviders } from './app-infos.providers';

@Module({
  providers: [AppInfosService, ...AppInfosProviders],
  controllers: [AppInfosController],
})
export class AppInfosModule {}
