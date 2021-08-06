import { ProvidersEntity } from 'src/providers/provider.entity';
export declare class CreateProviderReviewDto {
    readonly id?: number;
    readonly rating: number;
    readonly reviewBody: string;
    readonly contentWarnings: string[];
    provider: ProvidersEntity;
}
