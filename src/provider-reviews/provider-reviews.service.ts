import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderReviewsEntity } from './provider-review.entity';
import { CreateProviderReviewDto } from './dto/create-provider-review.dto';

@Injectable()
export class ProviderReviewsService {
    constructor(
        @InjectRepository(ProviderReviewsEntity)
        private providersRepository: Repository<ProviderReviewsEntity>,
    ) { }

    async create(data: CreateProviderReviewDto): Promise<ProviderReviewsEntity> {
        this.providersRepository.create(data);
        const provider = await this.providersRepository.save(data);
        return provider;
    }

    update(id: number, data: Partial<CreateProviderReviewDto>): Promise<ProviderReviewsEntity> {
        this.providersRepository.update({ id }, data);
        return this.providersRepository.findOne({ id });
    }

    showAll(): Promise<ProviderReviewsEntity[]> {
        return this.providersRepository.find();
    }

    showOne(id: number): Promise<ProviderReviewsEntity> {
        return this.providersRepository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.providersRepository.delete(id);
    }
}