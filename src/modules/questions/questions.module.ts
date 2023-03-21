import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionsProviders } from './questions.providers';
import { AlternativesService } from '../alternatives/alternatives.service';
import { AlternativesProviders } from '../alternatives/alternatives.providers';

@Module({
  providers: [
    QuestionsService,
    AlternativesService,
    ...QuestionsProviders,
    ...AlternativesProviders,
  ],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
