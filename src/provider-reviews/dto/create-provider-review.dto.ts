import { IsInt, IsString } from 'class-validator';
import { ProvidersEntity } from '../../providers/provider.entity';

export class CreateProviderReviewDto {
    @IsInt()
    readonly id?: number;
    
    @IsInt()
    readonly rating: number;

    @IsString()
    readonly reviewBody: string;

    @IsString({ each: true })
    readonly contentWarnings: string[];
    
    provider: ProvidersEntity;

}