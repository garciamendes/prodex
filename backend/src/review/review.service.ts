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

@Injectable()
export class ReviewService implements ReviewInterface {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  async create(data: CreateReviewDto): Promise<Review> {
    try {
      const review = await this.reviewModel.create(data);
      return review;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async list(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async get(reviewId: string): Promise<Review> {
    if (!isValidObjectId(reviewId)) throw new BadRequestException('Invalid ID');

    const review = await this.reviewModel.findOne({ _id: reviewId }).exec();

    if (!review) throw new NotFoundException('Review not found');

    return review;
  }

  async update(reviewId: string, data: UpdateReviewDto): Promise<Review> {
    try {
      const review = await this.reviewModel
        .findByIdAndUpdate(reviewId, data, { new: true })
        .exec();

      if (!review) throw new NotFoundException('Review not found');

      return review;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error);
    }
  }

  async delete(reviewId: string): Promise<Review> {
    try {
      if (!isValidObjectId(reviewId))
        throw new BadRequestException('Invalid ID');

      const review = await this.reviewModel.findByIdAndDelete(reviewId).exec();

      if (!review) throw new NotFoundException('Review not found');

      return review;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error);
    }
  }
}
