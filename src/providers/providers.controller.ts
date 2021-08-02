import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpStatus,
    NotFoundException,
} from '@nestjs/common';

import { ProvidersService } from './providers.service';
import { Provider } from './dto/provider.interface';
import { CreateProviderDto } from './dto/create-provider.dto';
import { validateOrReject } from 'class-validator';
import { ProvidersEntity } from './provider.entity';

@Controller('providers')
export class ProvidersController {
    constructor(private providersService: ProvidersService) { }

    @Get()
    async showAllProviders() {
        const providers = await this.providersService.showAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Providers fetched successfully',
            providers
        };
    }

    @Post()
    async createProvider(@Body() data: CreateProviderDto) {
        try {
            validateOrReject(data)
            const provider = await this.providersService.create(data);
            return {
                statusCode: HttpStatus.OK,
                message: 'Provider created successfully',
                provider
            };
        } catch (errors) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Caught promise rejection (validation failed).',
                errors: errors
            };
        }
    }

    @Get(':id')
    async readProvider(@Param('id') id: number) {
        const provider: ProvidersEntity = await this.providersService.showOne(id);
        if (provider === undefined) {
            throw new NotFoundException('Invalid provider id');
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Provider fetched successfully',
            provider,
        };
    }

    @Patch(':id')
    async uppdateProvider(@Param('id') id: number, @Body() data: Partial<CreateProviderDto>) {
        const provider: ProvidersEntity = await this.providersService.showOne(id);
        if (provider === undefined) {
            throw new NotFoundException('Invalid provider id');
        }

        try {
            validateOrReject(data);
            await this.providersService.update(id, data);
            return {
                statusCode: HttpStatus.OK,
                message: 'Provider updated successfully',
            };
        } catch (errors) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Caught promise rejection (validation failed).',
                errors: errors
            };
        }
    }

    @Delete(':id')
    async deleteProvider(@Param('id') id: number) {
        const provider: ProvidersEntity = await this.providersService.showOne(id);
        if (provider === undefined) {
            throw new NotFoundException('Invalid provider id');
        }

        await this.providersService.remove(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Provider deleted successfully',
        };

    }
}