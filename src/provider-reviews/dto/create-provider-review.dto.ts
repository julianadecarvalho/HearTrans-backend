import { IsInt, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateProviderReviewDto {
    @IsInt()
    readonly id?: number;
    
    @IsInt()
    readonly rating: number;

    @IsString()
    readonly reviewBody: string;

    @IsInt()
    providerId: number;

}