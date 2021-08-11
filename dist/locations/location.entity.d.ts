import { ProvidersEntity } from 'src/providers/provider.entity';
import { Point } from 'geojson';
export declare class LocationsEntity {
    id: number;
    locationName: string;
    locationTypes: string[];
    googleMapsUrl: string;
    locationUrl: string;
    latitude: string;
    longitude: string;
    phone: string;
    address: string;
    googlePlaceId: string;
    locationPoint: Point;
    providers: ProvidersEntity[];
    asDict: () => {
        id: number;
        locationName: string;
        locationTypes: string[];
        googleMapsUrl: string;
        locationUrl: string;
        latitude: string;
        longitude: string;
        phone: string;
        address: string;
        providers: void;
    };
    asDictNoProviders: () => {
        id: number;
        locationName: string;
        locationTypes: string[];
        googleMapsUrl: string;
        locationUrl: string;
        latitude: string;
        longitude: string;
        phone: string;
        address: string;
    };
}
