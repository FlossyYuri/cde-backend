import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CuponDto, UpdateCuponDto } from './dto/cupon.dto';
import { Cupon as CuponsEntity } from './cupon.entity';
import { CuponsService } from './cupons.service';
import { PaginationOptions } from 'src/utils/pagination.util';

export interface CuponFilterOptions extends PaginationOptions {
  user_id?: string;
  coins?: number;
  premium?: boolean;
}

@Controller('cupons')
export class CuponsController {
  constructor(private readonly cuponService: CuponsService) {}

  @Get()
  async findAll(@Query() query: CuponFilterOptions) {
    return await this.cuponService.findAll(query);
  }

  @Get(':code')
  async findOne(@Param('code') code: string): Promise<CuponsEntity> {
    const cupons = await this.cuponService.findOne(code);

    if (!cupons) {
      throw new NotFoundException("This Cupons doesn't exist");
    }

    return cupons;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() cupons: CuponDto): Promise<CuponsEntity> {
    return await this.cuponService.create(cupons);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':code')
  async update(
    @Param('code') code: string,
    @Body() cupons: UpdateCuponDto,
  ): Promise<CuponsEntity> {
    const { numberOfAffectedRows, updatedCupon } =
      await this.cuponService.update(code, cupons);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Cupons doesn't exist");
    }

    return updatedCupon;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':code')
  async remove(@Param('code') code: string) {
    const deleted = await this.cuponService.delete(code);

    if (deleted === 0) {
      throw new NotFoundException("This Cupons doesn't exist");
    }

    return 'Successfully deleted';
  }
}
