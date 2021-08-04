import { Module } from '@nestjs/common';
import { ProviderReviewsModule } from './provider-reviews.module';
import { ProviderReviewsService } from './provider-reviews.service';
import { ProviderReviewsController } from './provider-reviews.controller';

@Module({
    imports: [ProviderReviewsModule],
    providers: [ProviderReviewsService],
    controllers: [ProviderReviewsController]
})
export class ProviderReviewHttpModule { }
