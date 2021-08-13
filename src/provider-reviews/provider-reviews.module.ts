import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderReviewsService } from './provider-reviews.service';
import { ProviderReviewsController } from './provider-reviews.controller';
import { ProviderReviewsEntity } from './provider-review.entity';
import { ProvidersModule } from '../providers/providers.module';

@Module({
    imports: [TypeOrmModule.forFeature([ProviderReviewsEntity]), forwardRef(() => ProvidersModule)],
    providers: [ProviderReviewsService],
    controllers: [ProviderReviewsController],
})
export class ProviderReviewsModule { }
