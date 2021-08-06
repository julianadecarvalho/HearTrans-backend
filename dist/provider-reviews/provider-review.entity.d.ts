import { ProvidersEntity } from 'src/providers/provider.entity';
export declare class ProviderReviewsEntity {
    id: number;
    rating: number;
    reviewBody: string;
    provider: ProvidersEntity;
}
