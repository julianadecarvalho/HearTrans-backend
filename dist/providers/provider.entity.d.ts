import { ProviderReviewsEntity } from 'src/provider-reviews/provider-review.entity';
import { LocationsEntity } from 'src/locations/location.entity';
export declare class ProvidersEntity {
    id: number;
    fullName: string;
    otherNames: string[];
    titles: string[];
    specialties: string[];
    languages: string[];
    services: string[];
    remoteVisits: boolean;
    slidingScalePay: boolean;
    reviews: ProviderReviewsEntity[];
    locations: LocationsEntity[];
    asDict: () => {
        id: number;
        fullName: string;
        otherNames: string[];
        titles: string[];
        specialties: string[];
        languages: string[];
        services: string[];
        remoteVisits: boolean;
        slidingScalePay: boolean;
        reviews: ProviderReviewsEntity[];
        locations: LocationsEntity[];
        avgRating: string;
    };
}
