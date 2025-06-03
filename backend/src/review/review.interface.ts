import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './schemas/review.schema';

export interface ReviewInterface {
  create: (data: CreateReviewDto) => Promise<Review>;
  list: () => Promise<Review[]>;
  get: (reviewId: string) => Promise<Review | null>;
  update: (reviewId: string, data: UpdateReviewDto) => Promise<Review | null>;
  delete: (reviewId: string) => Promise<Review | null>;
}
