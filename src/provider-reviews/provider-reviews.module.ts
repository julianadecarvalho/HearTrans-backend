import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderReviewsService } from './provider-reviews.service';
import { ProviderReviewsController } from './provider-reviews.controller';
import { ProviderReviewsEntity } from './provider-review.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProviderReviewsEntity])],
    providers: [ProviderReviewsService],
    controllers: [ProviderReviewsController],
})
export class ProviderReviewsModule { }
