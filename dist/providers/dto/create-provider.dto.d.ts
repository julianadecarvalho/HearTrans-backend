import { LocationsEntity } from 'src/locations/location.entity';
export declare class CreateProviderDto {
    readonly id?: number;
    readonly fullName: string;
    readonly otherNames: string[];
    readonly titles: string[];
    readonly specialties: string[];
    readonly languages: string[];
    readonly services: string[];
    readonly remoteVisits?: boolean;
    readonly slidingScalePay?: boolean;
    locations?: LocationsEntity[];
}
