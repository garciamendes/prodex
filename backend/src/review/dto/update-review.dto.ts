/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsString({ message: 'Comment must be a string' })
  comment?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Rating must be a number' })
  rating: number;
}
