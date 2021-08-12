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
import { ProvidersEntity } from 'src/providers/provider.entity';
import { ProvidersService } from 'src/providers/providers.service';
import { RequestBodyLocationWithin } from './dto/request-location.dto';
import { parse } from 'path/posix';

require('dotenv').config()
const KEY = process.env.KEY;
@Controller('locations')
export class LocationsController {
    constructor(private locationsService: LocationsService, private providersService: ProvidersService) { }

    @Get()
    async showAllLocations() {
        const locations = await this.locationsService.showAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Locations fetched successfully',
            locations
        };
    }

    @Post('new/:text')
    // add call to google place id finder so we can use and make call to
    // add call to google place details api around here to create the location data
    // we should look into json parsing for this 
    async createLocation(@Param('text') text: string) {

        var axios = require('axios');
        var config = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + text + '&inputtype=textquery&fields=place_id,formatted_address,name,geometry&key=' + KEY,
            headers: {}
        };

        axios(config)
            .then(async function (response) {
                const parsedJson = (JSON.parse(response.data)).candidates[0];
                const data: Partial<CreateLocationDto> = {
                    locationName: parsedJson.name,
                    locationTypes: parsedJson.types,
                    latitude: parsedJson.geometry.location.lat,
                    longitude: parsedJson.geometry.location.lng,
                    address: parsedJson.formatted_address,
                    googlePlaceId: parsedJson.place_id,
                };
                console.log("1");
                const config2 = {
                    method: 'get',
                    url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + data.googlePlaceId + '&inputtype=textquery&fields=formatted_phone_number,url,website&key=' + KEY,
                    headers: {}
                };
                
                axios(config2)
                    .then(async function (response2) {
                        const parsedJson2 = (JSON.parse(response2.data)).result;
                        data['phone'] = parsedJson2.formatted_phone_number;
                        data['locationUrl'] = parsedJson2.website;
                        data['googleMapsUrl'] = parsedJson2.url;

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
                    })
            })
            .catch(function (error) {
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'ERROR.',
                    errors: error
                };
            });
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

    @Get('search/within')
    //NOT DONE YET
    //add call to the searchwithin function after parsing the json
    async findLocationWithin(@Body() data: RequestBodyLocationWithin) {
        var axios = require('axios');
        const address = encodeURI(data.address);
        var config = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + 'key=' + KEY,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                const parsedJson = (JSON.parse(response.data));
                const lat = parsedJson;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    @Patch(':id')
    async updateLocation(@Param('id', new ParseIntPipe()) id: number, @Body() data: Partial<CreateLocationDto>) {
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

    @Patch(':locationId/:providerId')
    async addProvider(@Param('locationId', new ParseIntPipe()) locationId: number, @Param('providerId', new ParseIntPipe()) providerId: number,) {
        const location: LocationsEntity = await this.locationsService.showOne(locationId);
        if (location === undefined) {
            throw new NotFoundException('Invalid location id');
        }
        const provider: ProvidersEntity = await this.providersService.showOne(providerId);
        if (provider === undefined) {
            throw new NotFoundException('Invalid provider id');
        }
        try {
            location.providers.push(provider)
            await this.locationsService.update(locationId, location);
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