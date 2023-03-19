import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { SubjectsProviders } from './subject.providers';

@Module({
  providers: [SubjectsService, ...SubjectsProviders],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
