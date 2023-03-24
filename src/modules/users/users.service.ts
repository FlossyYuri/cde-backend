import { Inject, Injectable } from '@nestjs/common';
import { paginationBuilder, PaginatedData } from 'src/utils/pagination.util';
import { USER_REPOSITORY } from '../../core/constants';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserFilterOptions } from './users.controller';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findAll({
    page = 1,
    size = 10,
    ...rest
  }: UserFilterOptions): Promise<PaginatedData<User>> {
    return await paginationBuilder(this.userRepository, {
      page,
      size,
      options: {
        where: { ...rest },
        attributes: { exclude: ['password'] },
      },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }
  async findOneUsername(username: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { username } });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  }

  async delete(id) {
    return await this.userRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedUser };
  }
}
