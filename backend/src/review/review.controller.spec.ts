import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { Types } from 'mongoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

describe('ReviewController', () => {
  let controller: ReviewController;
  let service: DeepMockProxy<ReviewService>;

  beforeEach(async () => {
    const serviceMock = mockDeep<ReviewService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
    service = module.get<DeepMockProxy<ReviewService>>(ReviewService);
  });

  describe('Create', () => {
    it('Should create a new review', async () => {
      const mockedReview = {
        _id: new Types.ObjectId(),
        author: 'Joe Doe 01',
        rating: 5,
        product: new Types.ObjectId().toString(),
        comment: 'Anything',
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      service.create.mockResolvedValueOnce(mockedReview as any);

      const data: CreateReviewDto = {
        author: 'Joe Doe 01',
        rating: 5,
        product: new Types.ObjectId().toString(),
        comment: 'Anything',
      };
      const result = await controller.create(data);

      expect(result).toEqual(mockedReview);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith(data);
    });
  });

  describe('Get', () => {
    it('Should return a single review', async () => {
      const mockedReview = {
        _id: new Types.ObjectId(),
        author: 'Joe Doe 01',
        rating: 5,
        product: new Types.ObjectId().toString(),
        comment: 'Anything',
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      service.get.mockResolvedValueOnce(mockedReview as any);

      const reviewId = new Types.ObjectId().toString();
      const result = await controller.get(reviewId);

      expect(result).toEqual(mockedReview);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.get).toHaveBeenCalledWith(reviewId);
    });
  });

  describe('Update', () => {
    it('Should update a single review', async () => {
      const mockedReview = {
        _id: new Types.ObjectId(),
        author: 'Joe Doe 01',
        rating: 5,
        product: new Types.ObjectId().toString(),
        comment: 'Anything',
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      service.update.mockResolvedValueOnce(mockedReview as any);

      const reviewId = new Types.ObjectId().toString();
      const data: UpdateReviewDto = {
        rating: 5,
      };
      const result = await controller.update(reviewId, data);

      expect(result).toEqual(mockedReview);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.update).toHaveBeenCalledWith(reviewId, data);
    });
  });

  describe('Delete', () => {
    it('Should delete a single review', async () => {
      const mockedReview = {
        _id: new Types.ObjectId(),
        author: 'Joe Doe 01',
        rating: 3.4,
        product: new Types.ObjectId().toString(),
        comment: 'Anything',
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      service.delete.mockResolvedValueOnce(mockedReview as any);

      const reviewId = new Types.ObjectId().toString();
      const result = await controller.delete(reviewId);

      expect(result).toEqual(mockedReview);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.delete).toHaveBeenCalledWith(reviewId);
    });
  });
});
