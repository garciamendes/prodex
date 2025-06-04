export class ResponseReviewDto {
  id: string;
  author: string;
  comment: string;
  rating: number;
  product?: string;
  createdAt: Date;

  constructor(partial: Partial<ResponseReviewDto>) {
    Object.assign(this, partial);
  }
}
