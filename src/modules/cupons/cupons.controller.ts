import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CuponDto, UpdateCuponDto } from './dto/cupon.dto';
import { Cupon as CuponsEntity } from './cupon.entity';
import { CuponsService } from './cupons.service';

@Controller('cupons')
export class CuponsController {
  constructor(private readonly cuponService: CuponsService) {}

  @Get()
  async findAll() {
    // get all cupons in the db
    return await this.cuponService.findAll();
  }

  @Get(':code')
  async findOne(@Param('code') code: string): Promise<CuponsEntity> {
    // find the cupons with this code
    const cupons = await this.cuponService.findOne(code);

    // if the cupons doesn't exit in the db, throw a 404 error
    if (!cupons) {
      throw new NotFoundException("This Cupons doesn't exist");
    }

    // if cupons exist, return the cupons
    return cupons;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() cupons: CuponDto): Promise<CuponsEntity> {
    // create a cupons cupons and return the cuponly created cupons
    return await this.cuponService.create(cupons);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':code')
  async update(
    @Param('code') code: string,
    @Body() cupons: UpdateCuponDto,
  ): Promise<CuponsEntity> {
    // get the number of row affected and the updated cupons
    const { numberOfAffectedRows, updatedCupon } =
      await this.cuponService.update(code, cupons);

    // if the number of row affected is zero,
    // it means the cupons doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Cupons doesn't exist");
    }

    // return the updated cupons
    return updatedCupon;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':code')
  async remove(@Param('code') code: string) {
    // delete the cupons with this code
    const deleted = await this.cuponService.delete(code);

    // if the number of row affected is zero,
    // then the cupons doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Cupons doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
