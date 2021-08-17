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
    Redirect,
} from '@nestjs/common';

import { ParseIntPipe } from '../common/parse-int.pipe';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { validateOrReject } from 'class-validator';
import { LocationsEntity } from './location.entity';
import { ProvidersEntity } from 'src/providers/provider.entity';
import { ProvidersService } from 'src/providers/providers.service';
import { RequestBodyLocationWithin } from './dto/request-location.dto';

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
    async createLocation(@Param('text') text: string) {

        var axios = require('axios');
        var config = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + text + '&inputtype=textquery&fields=place_id,formatted_address,types,name,geometry&key=' + KEY,
            headers: {}
        };

        var useMe = this.locationsService;

        return axios(config)
            .then(async function (response) {
                const parsedJson = response.data.candidates[0];
                const data: CreateLocationDto = {
                    locationName: parsedJson.name,
                    locationTypes: parsedJson.types,
                    latitude: parsedJson.geometry.location.lat,
                    longitude: parsedJson.geometry.location.lng,
                    address: parsedJson.formatted_address,
                    googlePlaceId: parsedJson.place_id,
                };
                const config2 = {
                    method: 'get',
                    url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + data.googlePlaceId + '&inputtype=textquery&fields=formatted_phone_number,url,website&key=' + KEY,
                    headers: {}
                };

                return axios(config2)
                    .then(async function (response2) {
                        const parsedJson2 = response2.data.result;
                        data['phone'] = parsedJson2.formatted_phone_number;
                        data['locationUrl'] = parsedJson2.website;
                        data['googleMapsUrl'] = parsedJson2.url;

                        try {
                            validateOrReject(data);
                            const location = await useMe.create(data);
                            return {
                                statusCode: HttpStatus.OK,
                                message: 'Location created successfully',
                                location
                            };
                        } catch (errors) {
                            console.log(errors);
                            throw new BadRequestException(errors);
                        }
                    })
            })
            .catch(function (error) {
                console.log(error);
                throw new BadRequestException(error);
            });
    }


    @Get(':id')
    async readLocation(@Param('id', new ParseIntPipe()) id: number) {
        const location: LocationsEntity = await this.locationsService.showOne(id);
        if (location === undefined) {
            throw new NotFoundException('Invalid location id');
        }
        const locationResponse = location.locAsDict()
        return {
            statusCode: HttpStatus.OK,
            message: 'Location fetched successfully',
            locationResponse,
        };
    }

    @Get('query/:query')
    async findLocationPerQuery(@Param('query') query: string) {
        let locations: LocationsEntity[] = await this.locationsService.searchByQuery(query)

        if (locations == []) {
            throw new NotFoundException('The search returned no locations :(');
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Location fetched successfully',
            locations,
        };
    }

    // @Get('query/queryme')
    // async findLocationPerQueryWithin(@Body() data: RequestBodyLocationWithin) {
    //     try {
    //         let locations = [];
    //         if (data.lat == undefined || data.lon == undefined) {
    //             if (data.text == undefined) {
    //                 locations = await this.locationsService.showAll();
    //             } else {
    //                 locations = await this.locationsService.searchByQuery(data.text)
    //             }
    //         } else {
    //             data.withinMiles = data.withinMiles ? data.withinMiles : 50;
    //             if (data.text == undefined) {
    //                 locations = await this.locationsService.searchWithin(data.withinMiles, data.lat, data.lon);
    //             } else {
    //                 locations = await this.locationsService.searchByQueryWithin(data.withinMiles, data.lat, data.lon, data.text);
    //             }
    //         }
    //         console.log(locations);
    //         if (locations == []) {
    //             throw new NotFoundException('The search returned no locations :(');
    //         }
    //         return {
    //             statusCode: HttpStatus.OK,
    //             message: 'Location fetched successfully',
    //             locations,
    //         };
    //     } catch (errors) {
    //         console.log(errors);
    //         throw new BadRequestException(errors);
    //     }
    // }

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
            console.log(errors);
            throw new BadRequestException(errors);
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

    @Post('updateall')
    async updateAllLocations() {
        try {
            var locations: LocationsEntity[] = await this.locationsService.showAll();
            locations.map(location => this.updateLocation(location.id, { tsvector: "hello" }));
            await this.locationsService.regenerateAllVectors();
            // this.locationsService.updateAllstringstoTsvectors();
            return locations;
        } catch (errors) {
            console.log(errors);
            throw new BadRequestException(errors)
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