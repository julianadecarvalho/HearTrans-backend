"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsController = void 0;
const common_1 = require("@nestjs/common");
const parse_int_pipe_1 = require("../common/parse-int.pipe");
const locations_service_1 = require("./locations.service");
const class_validator_1 = require("class-validator");
const provider_entity_1 = require("../providers/provider.entity");
const providers_service_1 = require("../providers/providers.service");
const request_location_dto_1 = require("./dto/request-location.dto");
require('dotenv').config();
const KEY = process.env.KEY;
let LocationsController = class LocationsController {
    constructor(locationsService, providersService) {
        this.locationsService = locationsService;
        this.providersService = providersService;
    }
    async showAllLocations() {
        const locations = await this.locationsService.showAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Locations fetched successfully',
            locations
        };
    }
    async createLocation(text) {
        var axios = require('axios');
        var config = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + text + '&inputtype=textquery&fields=place_id,formatted_address,name,geometry&key=' + KEY,
            headers: {}
        };
        axios(config)
            .then(async function (response) {
            const parsedJson = (JSON.parse(response.data)).candidates[0];
            const data = {
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
            axios(config2)
                .then(async function (response2) {
                const parsedJson2 = (JSON.parse(response.data)).result;
                data['phone'] = parsedJson2.formatted_phone_number;
                data['locationUrl'] = parsedJson2.website;
                data['googleMapsUrl'] = parsedJson2.url;
                try {
                    class_validator_1.validateOrReject(data);
                    const location = await this.locationsService.create(data);
                    return {
                        statusCode: common_1.HttpStatus.OK,
                        message: 'Location created successfully',
                        location
                    };
                }
                catch (errors) {
                    return {
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: 'Caught promise rejection (validation failed).',
                        errors: errors
                    };
                }
            });
        })
            .catch(function (error) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'ERROR.',
                errors: error
            };
        });
    }
    async readLocation(id) {
        const location = await this.locationsService.showOne(id);
        if (location === undefined) {
            throw new common_1.NotFoundException('Invalid location id');
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Location fetched successfully',
            location,
        };
    }
    async findLocationWithin(data) {
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
    async updateLocation(id, data) {
        const location = await this.locationsService.showOne(id);
        if (location === undefined) {
            throw new common_1.NotFoundException('Invalid location id');
        }
        try {
            class_validator_1.validateOrReject(data);
            await this.locationsService.update(id, data);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Location updated successfully',
            };
        }
        catch (errors) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Caught promise rejection (validation failed).',
                errors: errors
            };
        }
    }
    async addProvider(locationId, providerId) {
        const location = await this.locationsService.showOne(locationId);
        if (location === undefined) {
            throw new common_1.NotFoundException('Invalid location id');
        }
        const provider = await this.providersService.showOne(providerId);
        if (provider === undefined) {
            throw new common_1.NotFoundException('Invalid provider id');
        }
        try {
            location.providers.push(provider);
            await this.locationsService.update(locationId, location);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Location updated successfully',
            };
        }
        catch (errors) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Caught promise rejection (validation failed).',
                errors: errors
            };
        }
    }
    async deleteLocation(id) {
        const location = await this.locationsService.showOne(id);
        if (location === undefined) {
            throw new common_1.NotFoundException('Invalid location id');
        }
        await this.locationsService.remove(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Location deleted successfully',
        };
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "showAllLocations", null);
__decorate([
    common_1.Post(':address'),
    __param(0, common_1.Param('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "createLocation", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "readLocation", null);
__decorate([
    common_1.Get('search/within'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_location_dto_1.RequestBodyLocationWithin]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "findLocationWithin", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "updateLocation", null);
__decorate([
    common_1.Patch(':locationId/:providerId'),
    __param(0, common_1.Param('locationId', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Param('providerId', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "addProvider", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "deleteLocation", null);
LocationsController = __decorate([
    common_1.Controller('locations'),
    __metadata("design:paramtypes", [locations_service_1.LocationsService, providers_service_1.ProvidersService])
], LocationsController);
exports.LocationsController = LocationsController;
//# sourceMappingURL=locations.controller.js.map