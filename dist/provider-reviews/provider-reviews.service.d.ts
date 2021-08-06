import { Repository } from 'typeorm';
import { ProviderReviewsEntity } from './provider-review.entity';
import { CreateProviderReviewDto } from './dto/create-provider-review.dto';
export declare class ProviderReviewsService {
    private providersRepository;
    constructor(providersRepository: Repository<ProviderReviewsEntity>);
    create(data: CreateProviderReviewDto): Promise<ProviderReviewsEntity>;
    update(id: number, data: Partial<CreateProviderReviewDto>): Promise<ProviderReviewsEntity>;
    showAll(): Promise<ProviderReviewsEntity[]>;
    showOne(id: number): Promise<ProviderReviewsEntity>;
    remove(id: number): Promise<void>;
}
