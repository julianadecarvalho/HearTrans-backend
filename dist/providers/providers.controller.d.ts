import { HttpStatus } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersDTO } from './dto/provider.dto';
export declare class ProvidersController {
    private providersService;
    constructor(providersService: ProvidersService);
    showAllProviders(): Promise<{
        statusCode: HttpStatus;
        message: string;
        providers: import("./provider.entity").ProvidersEntity[];
    }>;
    createProviders(data: ProvidersDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
        provider: import("./provider.entity").ProvidersEntity;
    }>;
    readProvider(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./provider.entity").ProvidersEntity;
    }>;
    uppdateProvider(id: number, data: Partial<ProvidersDTO>): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    deleteProvider(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
