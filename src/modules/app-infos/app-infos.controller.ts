import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppInfo as AppInfoEntity } from './app-info.entity';
import { AppInfosService } from './app-infos.service';
import { AppInfoDto, UpdateAppInfoDto } from './dto/app-info.dto';

@Controller('app-infos')
export class AppInfosController {
  constructor(private readonly appInfoService: AppInfosService) {}

  @Get()
  async findAll() {
    return await this.appInfoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AppInfoEntity> {
    const appInfo = await this.appInfoService.findOne(id);
    if (!appInfo) {
      throw new NotFoundException("This AppInfo doesn't exist");
    }
    return appInfo;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() appInfo: AppInfoDto): Promise<AppInfoEntity> {
    return await this.appInfoService.create(appInfo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() appInfo: UpdateAppInfoDto,
  ): Promise<AppInfoEntity> {
    const { numberOfAffectedRows, updatedAppInfo } =
      await this.appInfoService.update(id, appInfo);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This AppInfo doesn't exist");
    }
    return updatedAppInfo;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.appInfoService.delete(id);
    if (deleted === 0) {
      throw new NotFoundException("This AppInfo doesn't exist");
    }

    return 'Successfully deleted';
  }
}
