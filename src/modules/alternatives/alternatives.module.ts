import { Module } from '@nestjs/common';
import { AlternativesProviders } from './alternatives.providers';
import { AlternativesService } from './alternatives.service';

@Module({
  providers: [AlternativesService, ...AlternativesProviders],
  exports: [AlternativesService, ...AlternativesProviders],
})
export class AlternativesModule {}
