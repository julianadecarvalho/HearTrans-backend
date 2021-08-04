import { HttpStatus } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { ProvidersEntity } from './provider.entity';
export declare class ProvidersController {
    private providersService;
    constructor(providersService: ProvidersService);
    showAllProviders(): Promise<{
        statusCode: HttpStatus;
        message: string;
        providers: ProvidersEntity[];
    }>;
    createProvider(data: CreateProviderDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        provider: ProvidersEntity;
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
        provider: ProvidersEntity;
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
    deleteProvider(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
