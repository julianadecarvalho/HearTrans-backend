import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvidersEntity } from 'src/providers/provider.entity';
import { ProviderReviewsEntity } from './provider-review.entity';
import { CreateProviderReviewDto } from './dto/create-provider-review.dto';

@Injectable()
export class ProviderReviewsService {
    constructor(
        @InjectRepository(ProviderReviewsEntity)
        private reviewRepository: Repository<ProviderReviewsEntity>,
    ) { }

    async create(data: CreateProviderReviewDto): Promise<ProviderReviewsEntity> {
        this.reviewRepository.create(data);
        const review = await this.reviewRepository.save(data);
        return review;
    }

    update(id: number, data: Partial<CreateProviderReviewDto>): Promise<ProviderReviewsEntity> {
        this.reviewRepository.update({ id }, data);
        return this.reviewRepository.findOne({ id });
    }

    showAll(): Promise<ProviderReviewsEntity[]> {
        return this.reviewRepository.find();
    }

    showOne(id: number): Promise<ProviderReviewsEntity> {
        return this.reviewRepository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.reviewRepository.delete(id);
    }
}