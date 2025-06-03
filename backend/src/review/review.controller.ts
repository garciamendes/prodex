import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './schemas/review.schema';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() data: CreateReviewDto): Promise<Review> {
    return this.reviewService.create(data);
  }

  @Get()
  async list(): Promise<Review[]> {
    return this.reviewService.list();
  }

  @Get(':reviewId')
  async get(@Param('reviewId') reviewId: string): Promise<Review | null> {
    return this.reviewService.get(reviewId);
  }

  @Patch(':reviewId')
  async update(
    @Param('reviewId') reviewId: string,
    @Body() data: UpdateReviewDto,
  ): Promise<Review | null> {
    return this.reviewService.update(reviewId, data);
  }

  @Delete(':reviewId')
  async delete(@Param('reviewId') reviewId: string): Promise<Review | null> {
    return this.reviewService.delete(reviewId);
  }
}
