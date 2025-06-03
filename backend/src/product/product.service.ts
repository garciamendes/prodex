import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductInterface } from './product.interface';
import { Review } from '../review/schemas/review.schema';
import { ResponseProductDto } from './dto/response-product.dto';
import { toProductResponse } from './adapters/product.adapter';

@Injectable()
export class ProductService implements ProductInterface {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  async create(data: CreateProductDto): Promise<ResponseProductDto> {
    try {
      const product = await this.productModel.create(data);
      return toProductResponse(product);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async list(): Promise<ResponseProductDto[]> {
    const products = await this.productModel.find().exec();
    return products.map((product) => toProductResponse(product));
  }

  async get(productId: string): Promise<ResponseProductDto> {
    if (!isValidObjectId(productId))
      throw new BadRequestException('Invalid ID');

    const product = await this.productModel.findOne({ _id: productId }).exec();

    if (!product) throw new NotFoundException('Product not found');

    const reviews =
      (await this.reviewModel
        .find({ product: productId })
        .select('-product')
        .exec()) ?? [];

    return toProductResponse(product, reviews);
  }

  async update(
    productId: string,
    data: UpdateProductDto,
  ): Promise<ResponseProductDto> {
    try {
      if (!isValidObjectId(productId))
        throw new BadRequestException('Invalid ID');

      const product = await this.productModel
        .findByIdAndUpdate(productId, data, {
          new: true,
        })
        .exec();

      if (!product) throw new NotFoundException('Product not found');

      return toProductResponse(product);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error);
    }
  }

  async delete(productId: string): Promise<ResponseProductDto> {
    try {
      if (!isValidObjectId(productId))
        throw new BadRequestException('Invalid ID');

      const product = await this.productModel
        .findByIdAndDelete(productId)
        .exec();

      if (!product) throw new NotFoundException('Product not found');

      return toProductResponse(product);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error);
    }
  }
}
