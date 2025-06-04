import { ResponseReviewDto } from 'src/review/dto/response-review.dto';

export class ResponseProductDto {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  reviews?: Array<ResponseReviewDto>;
  createdAt: Date;

  constructor(partial: Partial<ResponseProductDto>) {
    Object.assign(this, partial);
  }
}
