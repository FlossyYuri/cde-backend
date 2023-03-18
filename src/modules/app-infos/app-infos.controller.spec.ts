import { Test, TestingModule } from '@nestjs/testing';
import { AppInfosController } from './app-infos.controller';

describe('AppInfosController', () => {
  let controller: AppInfosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppInfosController],
    }).compile();

    controller = module.get<AppInfosController>(AppInfosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
