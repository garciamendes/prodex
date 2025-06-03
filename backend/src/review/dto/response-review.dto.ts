export class ResponseReviewDto {
  id: string;
  author: string;
  comment: string;
  rating: number;
  createdAt: Date;

  constructor(partial: Partial<ResponseReviewDto>) {
    Object.assign(this, partial);
  }
}
