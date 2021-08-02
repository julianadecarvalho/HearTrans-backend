import { HttpStatus } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { Provider } from './dto/provider.interface';
import { CreateProviderDto } from './dto/create-provider.dto';
export declare class ProvidersController {
    private providersService;
    constructor(providersService: ProvidersService);
    showAllProviders(): Promise<{
        statusCode: HttpStatus;
        message: string;
        providers: import("./provider.entity").ProvidersEntity[];
    }>;
    createProvider(data: CreateProviderDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        provider: import("./provider.entity").ProvidersEntity;
        errors?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        errors: any;
        provider?: undefined;
    }>;
    readProvider(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./provider.entity").ProvidersEntity;
    }>;
    uppdateProvider(id: number, data: Partial<Provider>): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    deleteProvider(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        response: void;
        errors?: undefined;
    } | {
        statusCode: HttpStatus;
        errors: any;
        message?: undefined;
        response?: undefined;
    }>;
}
