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
import { NewsDto, UpdateNewsDto } from './dto/new.dto';
import { New as NewsEntity } from './new.entity';
import { NewsService } from './news.service';
@Controller('news')
export class NewsController {
  constructor(private readonly newService: NewsService) {}

  @Get()
  async findAll() {
    return await this.newService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<NewsEntity> {
    const news = await this.newService.findOne(id);

    if (!news) {
      throw new NotFoundException("This News doesn't exist");
    }

    return news;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() news: NewsDto): Promise<NewsEntity> {
    return await this.newService.create(news);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() news: UpdateNewsDto,
  ): Promise<NewsEntity> {
    const { numberOfAffectedRows, updatedNews } = await this.newService.update(
      id,
      news,
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This News doesn't exist");
    }

    return updatedNews;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.newService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException("This News doesn't exist");
    }

    return 'Successfully deleted';
  }
}
