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
import { SubjectDto, UpdateSubjectDto } from './dto/subject.dto';
import { Subject as SubjectEntity } from './subject.entity';
import { SubjectsService } from './subjects.service';
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectService: SubjectsService) {}

  @Get()
  async findAll() {
    return await this.subjectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SubjectEntity> {
    const subject = await this.subjectService.findOne(id);

    if (!subject) {
      throw new NotFoundException("This Subject doesn't exist");
    }

    return subject;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() subject: SubjectDto): Promise<SubjectEntity> {
    return await this.subjectService.create(subject);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() subject: UpdateSubjectDto,
  ): Promise<SubjectEntity> {
    const { numberOfAffectedRows, updatedSubject } =
      await this.subjectService.update(id, subject);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Subject doesn't exist");
    }

    return updatedSubject;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.subjectService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException("This Subject doesn't exist");
    }

    return 'Successfully deleted';
  }
}
