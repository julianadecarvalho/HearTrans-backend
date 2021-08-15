import { ProvidersEntity } from 'src/providers/provider.entity';

export class ReviewResponse {
    readonly id: number;
    readonly rating: number;
    readonly reviewBody: string;
    readonly contentWarnings: string[];
    readonly providerId: number;
    readonly providerName: string;
}