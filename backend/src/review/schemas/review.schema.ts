import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from '../../product/schemas/product.schema';

@Schema()
export class Review extends Document {
  @Prop({ required: true, index: 1 })
  author: string;

  @Prop()
  comment: string;

  @Prop({
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: (value: number) => Number.isFinite(value),
      message: 'Rating must be a number between 1 and 5',
    },
    index: -1,
  })
  rating: number;

  @Prop({ required: true, type: Types.ObjectId, ref: Product.name, index: 1 })
  productId: Types.ObjectId;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
