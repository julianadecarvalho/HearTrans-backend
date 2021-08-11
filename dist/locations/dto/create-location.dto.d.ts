import { ProvidersEntity } from 'src/providers/provider.entity';
import { Point } from 'geojson';
export declare class CreateLocationDto {
    readonly id?: number;
    readonly locationName: string;
    readonly locationTypes: string[];
    googleMapsUrl: string;
    locationUrl: string;
    readonly latitude: string;
    readonly longitude: string;
    phone: string;
    readonly address: string;
    readonly googlePlaceId: string;
    providers?: ProvidersEntity[];
    locationPoint?: Point;
}
