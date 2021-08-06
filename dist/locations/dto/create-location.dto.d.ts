import { ProvidersEntity } from 'src/providers/provider.entity';
export declare class CreateLocationDto {
    readonly id?: number;
    readonly locationName: string;
    readonly locationTypes: string[];
    readonly googleMapsUrl: string;
    readonly locationUrl?: string;
    readonly latitude: string;
    readonly longitude: string;
    readonly phone: string;
    readonly address: string;
    readonly google_place_id: string;
    providers?: ProvidersEntity[];
}
