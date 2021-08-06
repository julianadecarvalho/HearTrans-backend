import { IsInt, IsNumberString, IsString, IsPhoneNumber, IsBoolean } from 'class-validator';
import { LocationsEntity } from 'src/locations/location.entity';
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

    @IsString({ each: true }) //STI, HIV care, primary, therapy, etc
    readonly services: string[];

    @IsBoolean()
    readonly remoteVisits?: boolean;

    @IsBoolean()
    readonly slidingScalePay?: boolean;

    locations?: LocationsEntity[];
}