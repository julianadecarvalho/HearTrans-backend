import { HttpStatus } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationsEntity } from './location.entity';
import { ProvidersService } from 'src/providers/providers.service';
import { RequestBodyLocationWithin } from './dto/request-location.dto';
export declare class LocationsController {
    private locationsService;
    private providersService;
    constructor(locationsService: LocationsService, providersService: ProvidersService);
    showAllLocations(): Promise<{
        statusCode: HttpStatus;
        message: string;
        locations: LocationsEntity[];
    }>;
    createLocation(data: CreateLocationDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        location: LocationsEntity;
        errors?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        errors: any;
        location?: undefined;
    }>;
    readLocation(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        location: LocationsEntity;
    }>;
    findLocationWithin(data: RequestBodyLocationWithin): Promise<void>;
    uppdateLocation(id: number, data: Partial<CreateLocationDto>): Promise<{
        statusCode: HttpStatus;
        message: string;
        errors?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        errors: any;
    }>;
    addProvider(locationId: number, providerId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        errors?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        errors: any;
    }>;
    deleteLocation(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
