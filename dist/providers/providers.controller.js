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
exports.ProvidersController = void 0;
const common_1 = require("@nestjs/common");
const parse_int_pipe_1 = require("../common/parse-int.pipe");
const providers_service_1 = require("./providers.service");
const create_provider_dto_1 = require("./dto/create-provider.dto");
const class_validator_1 = require("class-validator");
const locations_service_1 = require("../locations/locations.service");
const location_entity_1 = require("../locations/location.entity");
let ProvidersController = class ProvidersController {
    constructor(providersService, locationsService) {
        this.providersService = providersService;
        this.locationsService = locationsService;
    }
    async showAllProviders() {
        const providers = await this.providersService.showAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Providers fetched successfully',
            providers
        };
    }
    async createProvider(data) {
        try {
            class_validator_1.validateOrReject(data);
            const provider = await this.providersService.create(data);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Provider created successfully',
                provider
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
    async readProvider(id) {
        const provider = await this.providersService.showOne(id);
        if (provider === undefined) {
            throw new common_1.NotFoundException('Invalid provider id');
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Provider fetched successfully',
            provider,
        };
    }
    async uppdateProvider(id, data) {
        const provider = await this.providersService.showOne(id);
        if (provider === undefined) {
            throw new common_1.NotFoundException('Invalid provider id');
        }
        try {
            class_validator_1.validateOrReject(data);
            await this.providersService.update(id, data);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Provider updated successfully',
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
    async addLocation(locationId, providerId) {
        const location = await this.locationsService.showOne(locationId);
        if (location === undefined) {
            throw new common_1.NotFoundException('Invalid location id');
        }
        const provider = await this.providersService.showOne(providerId);
        if (provider === undefined) {
            throw new common_1.NotFoundException('Invalid provider id');
        }
        try {
            provider.locations.push(location);
            await this.locationsService.update(locationId, provider);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Provider updated successfully',
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
    async deleteProvider(id) {
        const provider = await this.providersService.showOne(id);
        if (provider === undefined) {
            throw new common_1.NotFoundException('Invalid provider id');
        }
        await this.providersService.remove(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Provider deleted successfully',
        };
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "showAllProviders", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_provider_dto_1.CreateProviderDto]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "createProvider", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "readProvider", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "uppdateProvider", null);
__decorate([
    common_1.Patch(':providerId/:locationId'),
    __param(0, common_1.Param('locationId', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Param('providerId', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "addLocation", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "deleteProvider", null);
ProvidersController = __decorate([
    common_1.Controller('providers'),
    __param(1, common_1.Inject(common_1.forwardRef(() => locations_service_1.LocationsService))),
    __metadata("design:paramtypes", [providers_service_1.ProvidersService, locations_service_1.LocationsService])
], ProvidersController);
exports.ProvidersController = ProvidersController;
//# sourceMappingURL=providers.controller.js.map