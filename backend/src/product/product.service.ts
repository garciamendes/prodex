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

@Injectable()
export class ProductService implements ProductInterface {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(data: CreateProductDto): Promise<Product> {
    try {
      const product = await this.productModel.create(data);
      return product;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async list(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async get(productId: string): Promise<Product> {
    if (!isValidObjectId(productId))
      throw new BadRequestException('Invalid ID');

    const product = await this.productModel.findOne({ _id: productId }).exec();

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async update(productId: string, data: UpdateProductDto): Promise<Product> {
    try {
      if (!isValidObjectId(productId))
        throw new BadRequestException('Invalid ID');

      const product = await this.productModel
        .findByIdAndUpdate(productId, data, {
          new: true,
        })
        .exec();

      if (!product) throw new NotFoundException('Product not found');

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error);
    }
  }

  async delete(productId: string): Promise<Product> {
    try {
      if (!isValidObjectId(productId))
        throw new BadRequestException('Invalid ID');

      const product = await this.productModel
        .findByIdAndDelete(productId)
        .exec();

      if (!product) throw new NotFoundException('Product not found');

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error);
    }
  }
}
