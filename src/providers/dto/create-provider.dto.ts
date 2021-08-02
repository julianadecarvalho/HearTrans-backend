import { IsInt, IsNumberString, IsString, IsPhoneNumber } from 'class-validator';

export class CreateProviderDto {
    @IsInt()
    readonly id?: number;
    
    @IsString()
    readonly fullName: string;

    @IsString({ each: true })
    readonly otherNames: Set<string>;

    @IsString({ each: true })
    readonly specialties: Set<string>;

    @IsString({ each: true })
    readonly languages: Set<string>;

}