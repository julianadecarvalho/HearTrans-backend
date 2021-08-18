import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpStatus,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';

import { ParseIntPipe } from '../common/parse-int.pipe';
import { ProvidersService } from 'src/providers/providers.service';
import { ProvidersEntity } from 'src/providers/provider.entity';
import { ProviderReviewsService } from './provider-reviews.service';
import { CreateProviderReviewDto } from './dto/create-provider-review.dto';
import { validateOrReject } from 'class-validator';
import { ProviderReviewsEntity } from './provider-review.entity';
import { ReviewResponse } from './dto/review-response.dto';

@Controller('provider/reviews')
export class ProviderReviewsController {
    constructor(private providerReviewsService: ProviderReviewsService,
        private providersService: ProvidersService) { }

    @Get(':providerId')
    async showAllProviderReviews(@Param('providerId', new ParseIntPipe()) providerId: number) {
        const provider: ProvidersEntity = await this.providersService.showOne(providerId);

        if (provider === undefined) {
            throw new NotFoundException('Invalid provider id');
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'Provider reviews fetched successfully',
            providerId: providerId,
            providerName: provider.fullName,
            reviews: provider.reviews
        };
    }

    @Post(':providerId')
    async createNewReview(@Param('providerId', new ParseIntPipe()) providerId: number, @Body() data: CreateProviderReviewDto) {
        const provider: ProvidersEntity = await this.providersService.showOne(providerId);
        if (provider === undefined) {

            throw new NotFoundException('Invalid provider id');
        }
        try {
            data.provider = provider
            validateOrReject(data)
            const review: ProviderReviewsEntity = await this.providerReviewsService.create(data);
            return {
                statusCode: HttpStatus.OK,
                message: 'ProviderReview created successfully',
                review,
            };
        } catch (errors) {
            console.log(errors);
            throw new BadRequestException(errors);
        }
    }


    @Patch(':reviewId')
    async uppdateProviderReview(@Param('reviewId', new ParseIntPipe()) reviewId: number, @Body() data: Partial<CreateProviderReviewDto>) {
        const review: ProviderReviewsEntity = await this.providerReviewsService.showOne(reviewId);
        if (review === undefined) {
            throw new NotFoundException('Invalid review id');
        }

        try {
            validateOrReject(data);
            const review = await (await this.providerReviewsService.update(reviewId, data)).revAsDict();
            return {
                statusCode: HttpStatus.OK,
                message: 'Review updated successfully',
                review,
            };
        } catch (errors) {
            throw new BadRequestException(errors);
        }
    }

    @Delete(':reviewId')
    async deleteProviderReview(@Param('reviewId', new ParseIntPipe()) reviewId: number) {
        const review: ProviderReviewsEntity = await this.providerReviewsService.showOne(reviewId);
        if (review === undefined) {
            throw new NotFoundException('Invalid review id');
        }

        await this.providerReviewsService.remove(reviewId);
        return {
            statusCode: HttpStatus.OK,
            message: 'Review deleted successfully',
        };

    }
}