import { ResponseReviewDto } from '../dto/response-review.dto';
import { Review } from '../schemas/review.schema';

export const toReviewResponse = (review: Review): ResponseReviewDto => {
  return new ResponseReviewDto({
    id: review._id as string,
    author: review.author,
    comment: review.comment,
    rating: review.rating,
    product: String(review.product),
    createdAt: review.createdAt,
  });
};
