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
import { Question as QuestionEntity } from './question.entity';
import { QuestionsService } from './questions.service';
import { QuestionDto, UpdateQuestionDto } from './dto/question.dto';
import { PaginationOptions } from 'src/utils/pagination.util';

export interface QuestionFilterOptions extends PaginationOptions {
  question?: string;
  answer?: string;
  category?: string;
  subject_id?: number;
}

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get()
  async findAll(@Query() query: QuestionFilterOptions) {
    return await this.questionService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<QuestionEntity> {
    const question = await this.questionService.findOne(id);
    if (!question) {
      throw new NotFoundException("This Question doesn't exist");
    }
    return question;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() question: QuestionDto): Promise<QuestionEntity> {
    return await this.questionService.create(question);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() question: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    const updatedQuestion = await this.questionService.update(id, question);
    return updatedQuestion;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.questionService.delete(id);
    if (deleted === 0) {
      throw new NotFoundException("This Question doesn't exist");
    }
    return 'Successfully deleted';
  }
}
