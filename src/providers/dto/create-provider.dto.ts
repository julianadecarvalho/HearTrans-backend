import { IsInt, IsNumberString, IsString, IsPhoneNumber } from 'class-validator';

export class CreateProviderDto {
    @IsInt()
    readonly id?: number;
    
    @IsString()
    readonly fullName: string;

    @IsString({ each: true })
    readonly otherNames: string[];

    @IsString({ each: true }) //MD, NP, etc?
    readonly titles: string[];

    @IsString({ each: true }) 
    readonly specialties: string[];

    @IsString({ each: true }) //should we add a dropdown selector in form?
    readonly languages: string[];

}