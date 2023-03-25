import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Test as TestEntity } from './test.entity';
import { TestsService } from './tests.service';
import { TestDto, UpdateTestDto } from './dto/test.dto';
import { PaginationOptions } from 'src/utils/pagination.util';

export interface TestFilterOptions extends PaginationOptions {
  category?: string;
  name?: string;
}

@Controller('tests')
export class TestsController {
  constructor(private readonly testService: TestsService) {}

  @Get()
  async findAll(@Query() query: TestFilterOptions) {
    return await this.testService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TestEntity> {
    const test = await this.testService.findOne(id);
    if (!test) {
      throw new NotFoundException("This Test doesn't exist");
    }
    return test;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() test: TestDto): Promise<TestEntity> {
    return await this.testService.create(test);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() test: UpdateTestDto,
  ): Promise<TestEntity> {
    const updatedTest = await this.testService.update(id, test);
    return updatedTest;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.testService.delete(id);
    if (deleted === 0) {
      throw new NotFoundException("This Test doesn't exist");
    }
    return 'Successfully deleted';
  }
}
