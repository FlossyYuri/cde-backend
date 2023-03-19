import { Inject, Injectable } from '@nestjs/common';
import { SUBJECT_REPOSITORY } from 'src/core/constants';
import { SubjectDto } from './dto/subject.dto';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject(SUBJECT_REPOSITORY)
    private readonly subjectRepository: typeof Subject,
  ) {}

  async create(user: SubjectDto): Promise<Subject> {
    return await this.subjectRepository.create<Subject>(user);
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectRepository.findAll<Subject>();
  }

  async findOne(id: number): Promise<Subject> {
    return await this.subjectRepository.findOne<Subject>({ where: { id } });
  }

  async delete(id) {
    return await this.subjectRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedSubject]] =
      await this.subjectRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedSubject };
  }
}
