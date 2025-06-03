import { Injectable } from '@nestjs/common';
import { ReviewInterface } from './review.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './schemas/review.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService implements ReviewInterface {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  async create(data: CreateReviewDto): Promise<Review> {
    const review = await this.reviewModel.create(data);
    return review;
  }

  async list(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async get(reviewId: string): Promise<Review | null> {
    return this.reviewModel.findOne({ _id: reviewId }).exec();
  }

  async update(
    reviewId: string,
    data: UpdateReviewDto,
  ): Promise<Review | null> {
    return this.reviewModel
      .findByIdAndUpdate(reviewId, data, { new: true })
      .exec();
  }

  async delete(reviewId: string): Promise<Review | null> {
    return this.reviewModel.findByIdAndDelete(reviewId).exec();
  }
}
