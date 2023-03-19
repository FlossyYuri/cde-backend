import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { SubjectDto, UpdateSubjectDto } from './dto/subject.dto';
import { Subject as SubjectEntity } from './subject.entity';
import { SubjectsService } from './subjects.service';
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectService: SubjectsService) {}

  @Get()
  async findAll() {
    // get all subject in the db
    return await this.subjectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SubjectEntity> {
    // find the subject with this id
    const subject = await this.subjectService.findOne(id);

    // if the subject doesn't exit in the db, throw a 404 error
    if (!subject) {
      throw new NotFoundException("This Subject doesn't exist");
    }

    // if subject exist, return the subject
    return subject;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() subject: SubjectDto): Promise<SubjectEntity> {
    // create a new subject and return the newly created subject
    return await this.subjectService.create(subject);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() subject: UpdateSubjectDto,
  ): Promise<SubjectEntity> {
    // get the number of row affected and the updated subject
    const { numberOfAffectedRows, updatedSubject } =
      await this.subjectService.update(id, subject);

    // if the number of row affected is zero,
    // it means the subject doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Subject doesn't exist");
    }

    // return the updated subject
    return updatedSubject;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    // delete the subject with this id
    const deleted = await this.subjectService.delete(id);

    // if the number of row affected is zero,
    // then the subject doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Subject doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
