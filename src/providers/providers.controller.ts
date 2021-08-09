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
    Inject,
    forwardRef
} from '@nestjs/common';

import { ParseIntPipe } from '../common/parse-int.pipe';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { validateOrReject } from 'class-validator';
import { ProvidersEntity } from './provider.entity';
import { LocationsService } from 'src/locations/locations.service';
import { LocationsEntity } from 'src/locations/location.entity';
@Controller('providers')
export class ProvidersController {
    constructor(private providersService: ProvidersService, @Inject(forwardRef(() => LocationsService)) private locationsService: LocationsService) { }

    @Get()
    async showAllProviders() {
        var providers = await this.providersService.showAll();
        providers.forEach(element => element.asDict());
        return {
            statusCode: HttpStatus.OK,
            message: 'Providers fetched successfully',
            providers,
        };
    }

    @Post()
    // add api call to google here to populate the data
    async createProvider(@Body() data: CreateProviderDto) {
        try {
            validateOrReject(data)
            const provider = await this.providersService.create(data);
            const providerDict = provider.asDict();
            return {
                statusCode: HttpStatus.OK,
                message: 'Provider created successfully',
                providerDict,
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
    async readProvider(@Param('id', new ParseIntPipe()) id: number) {
        const provider: ProvidersEntity = await this.providersService.showOne(id);
        if (provider === undefined) {
            throw new NotFoundException('Invalid provider id');
        }
        const providerDict = provider.asDict();
        return {
            statusCode: HttpStatus.OK,
            message: 'Provider fetched successfully',
            providerDict,
        };
    }

    @Patch(':id')
    async uppdateProvider(@Param('id', new ParseIntPipe()) id: number, @Body() data: Partial<CreateProviderDto>) {
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

    @Patch(':providerId/:locationId')
    async addLocation(@Param('locationId', new ParseIntPipe()) locationId: number, @Param('providerId', new ParseIntPipe()) providerId: number,) {
        const location: LocationsEntity = await this.locationsService.showOne(locationId);
        if (location === undefined) {
            throw new NotFoundException('Invalid location id');
        }
        const provider: ProvidersEntity = await this.providersService.showOne(providerId);
        if (provider === undefined) {
            throw new NotFoundException('Invalid provider id');
        }
        try {
            provider.locations.push(location)
            await this.locationsService.update(locationId, provider);
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
    async deleteProvider(@Param('id', new ParseIntPipe()) id: number) {
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