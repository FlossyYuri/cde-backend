import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppInfosModule } from './modules/app-infos/app-infos.module';
import { CuponsModule } from './modules/cupons/cupons.module';
import { NewsModule } from './modules/news/news.module';
import { GiftsModule } from './modules/gifts/gifts.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { TestsModule } from './modules/tests/tests.module';
import { AlternativesModule } from './modules/alternatives/alternatives.module';
import { QuestionTestModule } from './modules/question-test/question-test.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    AppInfosModule,
    CuponsModule,
    NewsModule,
    GiftsModule,
    QuestionsModule,
    SubjectsModule,
    TestsModule,
    AlternativesModule,
    QuestionTestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
