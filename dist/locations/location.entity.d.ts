import { ProvidersEntity } from 'src/providers/provider.entity';
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
    google_place_id: string;
    providers: ProvidersEntity[];
}
