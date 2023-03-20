import { Sequelize } from 'sequelize-typescript';
import { Alternative } from 'src/modules/alternatives/alternative.entity';
import { AppInfo } from 'src/modules/app-infos/app-info.entity';
import { Cupon } from 'src/modules/cupons/cupon.entity';
import { Gift } from 'src/modules/gifts/gift.entity';
import { New } from 'src/modules/news/new.entity';
import { QuestionTest } from 'src/modules/question-test/question-test.entity';
import { Question } from 'src/modules/questions/question.entity';
import { Subject } from 'src/modules/subjects/subject.entity';
import { Test } from 'src/modules/tests/test.entity';
import { User } from 'src/modules/users/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        User,
        AppInfo,
        Alternative,
        Cupon,
        Gift,
        New,
        Question,
        Subject,
        Test,
        QuestionTest,
      ]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
