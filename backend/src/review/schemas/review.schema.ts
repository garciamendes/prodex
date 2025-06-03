import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from '../../product/schemas/product.schema';

@Schema()
export class Review extends Document {
  @Prop({ required: true })
  author: string;

  @Prop()
  comment: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ type: Types.ObjectId, ref: Product.name })
  productId: Types.ObjectId;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
