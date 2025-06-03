import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(data: CreateProductDto): Promise<Product> {
    const product = await this.productModel.create(data);
    return product;
  }

  async list(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async get(productId: string) {
    return this.productModel.findOne({ _id: productId }).exec();
  }

  async update(productId: string, data: UpdateProductDto) {
    return this.productModel
      .findByIdAndUpdate({ _id: productId }, data, {
        new: true,
      })
      .exec();
  }

  async delete(productId: string) {
    const deletedProduct = await this.productModel
      .findByIdAndDelete(productId)
      .exec();

    return deletedProduct;
  }
}
