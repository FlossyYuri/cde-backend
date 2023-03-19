import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsProviders } from './news.providers';

@Module({
  providers: [NewsService, ...NewsProviders],
  controllers: [NewsController],
})
export class NewsModule {}
