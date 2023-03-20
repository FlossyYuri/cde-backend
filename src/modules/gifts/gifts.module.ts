import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { GiftsProviders } from './gifts.providers';

@Module({
  providers: [GiftsService, ...GiftsProviders],
  controllers: [GiftsController],
})
export class GiftsModule {}
