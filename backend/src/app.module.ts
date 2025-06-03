import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from './env';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [MongooseModule.forRoot(env.DATABASE_URL), ProductModule, ReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
