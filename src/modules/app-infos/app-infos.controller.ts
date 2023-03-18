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
    // get all appInfos in the db
    return await this.appInfoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AppInfoEntity> {
    // find the appInfo with this id
    const appInfo = await this.appInfoService.findOne(id);

    // if the appInfo doesn't exit in the db, throw a 404 error
    if (!appInfo) {
      throw new NotFoundException("This AppInfo doesn't exist");
    }

    // if appInfo exist, return the appInfo
    return appInfo;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() appInfo: AppInfoDto): Promise<AppInfoEntity> {
    // create a new appInfo and return the newly created appInfo
    return await this.appInfoService.create(appInfo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() appInfo: UpdateAppInfoDto,
  ): Promise<AppInfoEntity> {
    // get the number of row affected and the updated appInfo
    const { numberOfAffectedRows, updatedAppInfo } =
      await this.appInfoService.update(id, appInfo);

    // if the number of row affected is zero,
    // it means the appInfo doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This AppInfo doesn't exist");
    }

    // return the updated appInfo
    return updatedAppInfo;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    // delete the appInfo with this id
    const deleted = await this.appInfoService.delete(id);

    // if the number of row affected is zero,
    // then the appInfo doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This AppInfo doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
