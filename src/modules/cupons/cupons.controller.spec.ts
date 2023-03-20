import { Test, TestingModule } from '@nestjs/testing';
import { CuponsController } from './cupons.controller';

describe('CuponsController', () => {
  let controller: CuponsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuponsController],
    }).compile();

    controller = module.get<CuponsController>(CuponsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
