import { IsInt, IsNumber, IsNumberString, IsString } from 'class-validator';
import { ProvidersEntity } from 'src/providers/provider.entity';

export class CreateProviderReviewDto {
    readonly id?: number;
    
    @IsInt()
    readonly rating: number;

    @IsString()
    readonly reviewBody: string;

    @IsString({ each: true })
    readonly contentWarnings: string[];
    
    provider: ProvidersEntity;

}