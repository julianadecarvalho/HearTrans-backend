import { HttpStatus } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { ProvidersEntity } from './provider.entity';
import { LocationsService } from 'src/locations/locations.service';
export declare class ProvidersController {
    private providersService;
    private locationsService;
    constructor(providersService: ProvidersService, locationsService: LocationsService);
    showAllProviders(): Promise<{
        statusCode: HttpStatus;
        message: string;
        providers: ProvidersEntity[];
    }>;
    createProvider(data: CreateProviderDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        providerDict: {
            id: number;
            fullName: string;
            otherNames: string[];
            titles: string[];
            specialties: string[];
            languages: string[];
            services: string[];
            remoteVisits: boolean;
            slidingScalePay: boolean;
            reviews: import("../provider-reviews/provider-review.entity").ProviderReviewsEntity[];
            locations: void;
            avgRating: string;
        };
        errors?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        errors: any;
        providerDict?: undefined;
    }>;
    readProvider(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        providerDict: {
            id: number;
            fullName: string;
            otherNames: string[];
            titles: string[];
            specialties: string[];
            languages: string[];
            services: string[];
            remoteVisits: boolean;
            slidingScalePay: boolean;
            reviews: import("../provider-reviews/provider-review.entity").ProviderReviewsEntity[];
            locations: void;
            avgRating: string;
        };
    }>;
    uppdateProvider(id: number, data: Partial<CreateProviderDto>): Promise<{
        statusCode: HttpStatus;
        message: string;
        errors?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        errors: any;
    }>;
    addLocation(locationId: number, providerId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        errors?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        errors: any;
    }>;
    deleteProvider(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
