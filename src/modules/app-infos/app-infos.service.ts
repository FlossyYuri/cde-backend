import { Injectable, Inject } from '@nestjs/common';
import { AppInfo } from './app-info.entity';
import { AppInfoDto } from './dto/app-info.dto';
import { AppInfo_REPOSITORY } from '../../core/constants';

@Injectable()
export class AppInfosService {
  constructor(
    @Inject(AppInfo_REPOSITORY)
    private readonly appInfoRepository: typeof AppInfo,
  ) {}

  async create(appinfo: AppInfoDto): Promise<AppInfo> {
    return await this.appInfoRepository.create<AppInfo>({ ...appinfo });
  }

  async findAll(): Promise<AppInfo[]> {
    return await this.appInfoRepository.findAll<AppInfo>();
  }

  async findOne(id): Promise<AppInfo> {
    return await this.appInfoRepository.findOne({
      where: { id },
    });
  }

  async delete(id) {
    return await this.appInfoRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedAppInfo]] =
      await this.appInfoRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedAppInfo };
  }
}
