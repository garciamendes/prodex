import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { Review } from './schemas/review.schema';
import { Model, Types } from 'mongoose';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { getModelToken } from '@nestjs/mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

describe('ReviewService', () => {
  let service: ReviewService;
  let model: DeepMockProxy<Model<Review>>;

  beforeEach(async () => {
    const modelMock = mockDeep<Model<Review>>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getModelToken('Review'),
          useValue: modelMock,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    model = module.get(getModelToken('Review'));
  });

  describe('Create', () => {
    it('Should insert a new review', async () => {
      const mockedReview: CreateReviewDto = {
        author: 'Joe Doe',
        productId: new Types.ObjectId().toString(),
        rating: 3.4,
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      model.create.mockResolvedValueOnce(mockedReview as any);

      const data: CreateReviewDto = {
        author: 'Joe Doe',
        productId: new Types.ObjectId().toString(),
        rating: 3.4,
      };
      const result = await service.create(data);

      expect(result).toEqual(mockedReview);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.create).toHaveBeenCalledWith(data);
    });
  });

  describe('List', () => {
    it('Should return all reviews', async () => {
      const mockedReviews = [
        {
          author: 'Joe Doe 1',
          productId: new Types.ObjectId().toString(),
          rating: 3.4,
        },
        {
          author: 'Joe Doe 2',
          productId: new Types.ObjectId().toString(),
          rating: 5,
        },
      ];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      model.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedReviews),
      } as any);

      const result = await service.list();

      expect(result).toEqual(mockedReviews);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('Get', () => {
    it('Should return one review', async () => {
      const mockedReview = {
        author: 'Joe Doe 2',
        productId: new Types.ObjectId().toString(),
        rating: 4.5,
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      model.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedReview),
      } as any);

      const reviewId = new Types.ObjectId().toString();
      const result = await service.get(reviewId);

      expect(result).toEqual(mockedReview);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findOne).toHaveBeenCalledWith({ _id: reviewId });
    });
  });

  describe('Update', () => {
    it('Should update a review', async () => {
      const mockedReview: UpdateReviewDto = {
        rating: 4.5,
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      model.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedReview),
      } as any);

      const reviewId = new Types.ObjectId().toString();
      const updateProductDto: UpdateReviewDto = {
        rating: 5,
      };
      const result = await service.update(reviewId, updateProductDto);

      expect(result).toEqual(mockedReview);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        reviewId,
        updateProductDto,
        { new: true },
      );
    });
  });

  describe('Delete', () => {
    it('Should delete a review', async () => {
      const mockedReview = {
        author: 'Joe Doe 2',
        productId: new Types.ObjectId().toString(),
        rating: 4.5,
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      model.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedReview),
      } as any);

      const reviewId = new Types.ObjectId().toString();
      const result = await service.delete(reviewId);

      expect(result).toEqual(mockedReview);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(reviewId);
    });
  });
});
