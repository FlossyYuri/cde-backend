import { Module } from '@nestjs/common';
import { CuponsService } from './cupons.service';
import { CuponsController } from './cupons.controller';
import { CuponsProviders } from './cupons.providers';

@Module({
  providers: [CuponsService, ...CuponsProviders],
  controllers: [CuponsController],
})
export class CuponsModule {}
