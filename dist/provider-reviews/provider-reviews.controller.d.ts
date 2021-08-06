import { HttpStatus } from '@nestjs/common';
import { ProvidersService } from 'src/providers/providers.service';
import { ProviderReviewsService } from './provider-reviews.service';
import { CreateProviderReviewDto } from './dto/create-provider-review.dto';
import { ProviderReviewsEntity } from './provider-review.entity';
export declare class ProviderReviewsController {
    private providerReviewsService;
    private providersService;
    constructor(providerReviewsService: ProviderReviewsService, providersService: ProvidersService);
    showAllProviderReviews(providerId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        providerId: number;
        providerName: string;
        reviews: ProviderReviewsEntity[];
    }>;
    createProviderReview(providerId: number, data: CreateProviderReviewDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        review: ProviderReviewsEntity;
        errors?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        errors: any;
        review?: undefined;
    }>;
    uppdateProviderReview(reviewId: number, data: Partial<CreateProviderReviewDto>): Promise<{
        statusCode: HttpStatus;
        message: string;
        errors?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        errors: any;
    }>;
    deleteProviderReview(reviewId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
