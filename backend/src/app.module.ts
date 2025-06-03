import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from './env';
import { Product, ProductSchema } from './product/schemas/product.schema';
import { Review, ReviewSchema } from './review/schemas/review.schema';

@Module({
  imports: [
    MongooseModule.forRoot(env.DATABASE_URL),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
