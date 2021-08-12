import { LocationResponse } from "src/locations/dto/location-response.dto";
import { ReviewResponse } from "src/provider-reviews/dto/review-response.dto";

export class ProviderResponse {
    readonly id: number;
    readonly fullName: string;
    readonly otherNames: string[];
    readonly titles: string[];
    readonly specialties: string[];
    readonly languages: string[];
    readonly services: string[];
    readonly remoteVisits?: boolean;
    readonly slidingScalePay?: boolean;
    avgRating: string;
    locations?: LocationResponse[];
    reviews?: ReviewResponse[];
}