import { IsString, IsPhoneNumber, IsLatitude, IsLongitude } from 'class-validator';
import { ProvidersEntity } from '../../providers/provider.entity';
import { Point } from 'geojson';
export class CreateLocationDto {
    readonly id?: number;

    @IsString()
    readonly locationName: string;

    @IsString({ each: true }) //hospital, pharmacy, etc
    readonly locationTypes: string[];

    @IsString()
    googleMapsUrl?: string;

    @IsString()
    locationUrl?: string;

    @IsLatitude()
    readonly latitude: string;

    @IsLongitude()
    readonly longitude: string;

    @IsPhoneNumber('US')
    phone?: string;

    @IsString()
    readonly address: string;

    @IsString()
    readonly googlePlaceId: string;

    providers?: ProvidersEntity[];

    locationPoint?: Point;
}