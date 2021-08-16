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
    BadRequestException,
    Inject,
    forwardRef
} from '@nestjs/common';

import { ParseIntPipe } from '../common/parse-int.pipe';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { validateOrReject } from 'class-validator';
import { ProvidersEntity } from './provider.entity';
import { ProviderResponse } from './dto/provider-response.dto';
import { LocationsService } from 'src/locations/locations.service';
import { LocationsEntity } from 'src/locations/location.entity';
@Controller('providers')
export class ProvidersController {
    constructor(private providersService: ProvidersService, @Inject(forwardRef(() => LocationsService)) private locationsService: LocationsService) { }

    @Get()
    async showAllProviders() {
        var providers: ProvidersEntity[] = await this.providersService.showAll();
        var providersResponses: ProviderResponse[] = providers.map(function (provider: ProvidersEntity): ProviderResponse { return provider.provAsDict() });
        return {
            statusCode: HttpStatus.OK,
            message: 'Providers fetched successfully',
            providersResponses,
        };
    }

    @Post()
    // add api call to google here to populate the data
    async createProvider(@Body() data: CreateProviderDto) {
        try {
            validateOrReject(data);
            const provider = await this.providersService.create(data);
            return {
                statusCode: HttpStatus.OK,
                message: 'Provider created successfully',
                provider,
            };
        } catch (errors) {
            console.log(errors);
            throw new BadRequestException(errors);
        }
    }

    @Get(':id')
    async readProvider(@Param('id', new ParseIntPipe()) id: number) {
        const provider: ProvidersEntity = await this.providersService.showOne(id);
        if (provider === undefined) {
            throw new NotFoundException('Invalid provider id');
        }
        const providerDict = provider.provAsDict();
        return {
            statusCode: HttpStatus.OK,
            message: 'Provider fetched successfully',
            providerDict,
        };
    }

    @Get('query/:query')
    async findProviderPerQuery(@Param('query') query: string) {
        if (query === '') {
            this.showAllProviders();

        } try {
            const providers: ProvidersEntity[] = await this.providersService.searchByQuery(query);

            if (providers === []) {
                throw new NotFoundException('The search returned no providers :(');
            };

            var providersResponses: ProviderResponse[] = providers.map(function (provider: ProvidersEntity): ProviderResponse { return provider.provAsDict() });

            return {
                statusCode: HttpStatus.OK,
                message: 'provider fetched successfully',
                providersResponses
            };
        } catch (errors) {
            console.log(errors);
            throw new BadRequestException(errors);
        }
    }

    @Patch(':id')
    async uppdateProvider(@Param('id', new ParseIntPipe()) id: number, @Body() data: Partial<CreateProviderDto>) {
        try {
            validateOrReject(data);
            const newProvider = await (await this.providersService.update(id, data)).provAsDict();
            return {
                statusCode: HttpStatus.OK,
                message: 'Provider updated successfully',
                newProvider,
            };
        } catch (errors) {
            console.log(errors);
            throw new BadRequestException(errors);
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
            var data: Partial<CreateLocationDto> = {};
            data["providers"] = location.providers ? [...location.providers, provider] : [provider];
            const newlocation = await this.locationsService.update(locationId, data);

            return {
                statusCode: HttpStatus.OK,
                message: 'Location updated successfully',
                newlocation,
            };
        } catch (errors) {
            console.log(errors);
            throw new BadRequestException(errors)
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

