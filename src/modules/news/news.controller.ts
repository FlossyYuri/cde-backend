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
    // get all news in the db
    return await this.newService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<NewsEntity> {
    // find the news with this id
    const news = await this.newService.findOne(id);

    // if the news doesn't exit in the db, throw a 404 error
    if (!news) {
      throw new NotFoundException("This News doesn't exist");
    }

    // if news exist, return the news
    return news;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() news: NewsDto): Promise<NewsEntity> {
    // create a news news and return the newly created news
    return await this.newService.create(news);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() news: UpdateNewsDto,
  ): Promise<NewsEntity> {
    // get the number of row affected and the updated news
    const { numberOfAffectedRows, updatedNews } = await this.newService.update(
      id,
      news,
    );

    // if the number of row affected is zero,
    // it means the news doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This News doesn't exist");
    }

    // return the updated news
    return updatedNews;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    // delete the news with this id
    const deleted = await this.newService.delete(id);

    // if the number of row affected is zero,
    // then the news doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This News doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
