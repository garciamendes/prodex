import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReviewInterface } from './review.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './schemas/review.schema';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { ResponseReviewDto } from './dto/response-review.dto';
import { toReviewResponse } from './adapters/review.adapter';

@Injectable()
export class ReviewService implements ReviewInterface {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  async create(data: CreateReviewDto): Promise<ResponseReviewDto> {
    try {
      const review = await this.reviewModel.create(data);
      return toReviewResponse(review);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async get(reviewId: string): Promise<ResponseReviewDto> {
    if (!isValidObjectId(reviewId)) throw new BadRequestException('Invalid ID');

    const review = await this.reviewModel.findOne({ _id: reviewId }).exec();

    if (!review) throw new NotFoundException('Review not found');

    return toReviewResponse(review);
  }

  async update(
    reviewId: string,
    data: UpdateReviewDto,
  ): Promise<ResponseReviewDto> {
    try {
      const review = await this.reviewModel
        .findByIdAndUpdate(reviewId, data, { new: true })
        .exec();

      if (!review) throw new NotFoundException('Review not found');

      return toReviewResponse(review);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error);
    }
  }

  async delete(reviewId: string): Promise<ResponseReviewDto> {
    try {
      if (!isValidObjectId(reviewId))
        throw new BadRequestException('Invalid ID');

      const review = await this.reviewModel.findByIdAndDelete(reviewId).exec();

      if (!review) throw new NotFoundException('Review not found');

      return toReviewResponse(review);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error);
    }
  }
}
