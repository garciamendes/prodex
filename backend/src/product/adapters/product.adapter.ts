import { toReviewResponse } from '../../review/adapters/review.adapter';
import { ResponseProductDto } from '../dto/response-product.dto';
import { ProductDocument } from '../schemas/product.schema';
import { ReviewDocument } from '../../review/schemas/review.schema';

export const toProductResponse = (
  product: ProductDocument,
  reviews: ReviewDocument[] = [],
): ResponseProductDto => {
  return new ResponseProductDto({
    id: product._id as string,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    reviews: Array.isArray(reviews) ? reviews.map(toReviewResponse) : [],
    createdAt: product.createdAt,
  });
};
