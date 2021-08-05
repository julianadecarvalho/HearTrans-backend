import { IsInt, IsString, IsPhoneNumber, IsLatitude, IsLongitude } from 'class-validator';
import { ProvidersEntity } from 'src/providers/provider.entity';

export class CreateLocationDto {
    @IsInt()
    readonly id?: number;
    
    @IsString()
    readonly locationName: string;

    @IsString({ each: true }) //hospital, pharmacy, etc
    readonly locationTypes: string[];

    @IsString()
    readonly googleMapsUrl: string;

    @IsString()
    readonly locationUrl?: string;

    @IsLatitude()
    readonly latitude: string;

    @IsLongitude()
    readonly longitude: string;
    
    @IsPhoneNumber('US')
    readonly phone: string;

    @IsString()
    readonly address: string;
    
    @IsString()
    readonly google_place_id: string;

    providers?: ProvidersEntity[];

}