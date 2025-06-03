/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Name is a required fields' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Price is a required fields' })
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @IsNotEmpty({ message: 'Category is a required fields' })
  @IsString({ message: 'Category must be a string' })
  category: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
