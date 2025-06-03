import { CreateReviewDto } from './dto/create-review.dto';
import { ResponseReviewDto } from './dto/response-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

export interface ReviewInterface {
  create: (data: CreateReviewDto) => Promise<ResponseReviewDto>;
  get: (reviewId: string) => Promise<ResponseReviewDto>;
  update: (
    reviewId: string,
    data: UpdateReviewDto,
  ) => Promise<ResponseReviewDto>;
  delete: (reviewId: string) => Promise<ResponseReviewDto>;
}
