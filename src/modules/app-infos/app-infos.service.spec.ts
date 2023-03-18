import { Test, TestingModule } from '@nestjs/testing';
import { AppInfosService } from './app-infos.service';

describe('AppInfosService', () => {
  let service: AppInfosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppInfosService],
    }).compile();

    service = module.get<AppInfosService>(AppInfosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
