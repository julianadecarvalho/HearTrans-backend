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

import { ParseIntPipe } from '../common/parse-int.pipe';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { validateOrReject } from 'class-validator';
import { LocationsEntity } from './location.entity';

@Controller('locations')
export class LocationsController {
    constructor(private locationsService: LocationsService) { }

    @Get()
    async showAllLocations() {
        const locations = await this.locationsService.showAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Locations fetched successfully',
            locations
        };
    }

    @Post()
    // add call to google api around here to create the location data
    // we should look into json parsing for this 
    async createLocation(@Body() data: CreateLocationDto) {
        try {
            validateOrReject(data)
            const location = await this.locationsService.create(data);
            return {
                statusCode: HttpStatus.OK,
                message: 'Location created successfully',
                location
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
    async readLocation(@Param('id', new ParseIntPipe()) id: number) {
        const location: LocationsEntity = await this.locationsService.showOne(id);
        if (location === undefined) {
            throw new NotFoundException('Invalid location id');
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Location fetched successfully',
            location,
        };
    }

    @Patch(':id')
    async uppdateLocation(@Param('id', new ParseIntPipe()) id: number, @Body() data: Partial<CreateLocationDto>) {
        const location: LocationsEntity = await this.locationsService.showOne(id);
        if (location === undefined) {
            throw new NotFoundException('Invalid location id');
        }

        try {
            validateOrReject(data);
            await this.locationsService.update(id, data);
            return {
                statusCode: HttpStatus.OK,
                message: 'Location updated successfully',
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
    async deleteLocation(@Param('id', new ParseIntPipe()) id: number) {
        const location: LocationsEntity = await this.locationsService.showOne(id);
        if (location === undefined) {
            throw new NotFoundException('Invalid location id');
        }

        await this.locationsService.remove(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Location deleted successfully',
        };

    }
}