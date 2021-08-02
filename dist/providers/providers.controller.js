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
const providers_service_1 = require("./providers.service");
const create_provider_dto_1 = require("./dto/create-provider.dto");
const class_validator_1 = require("class-validator");
let ProvidersController = class ProvidersController {
    constructor(providersService) {
        this.providersService = providersService;
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
        const data = await this.providersService.showOne(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Provider fetched successfully',
            data,
        };
    }
    async uppdateProvider(id, data) {
        await this.providersService.update(id, data);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Provider updated successfully',
        };
    }
    async deleteProvider(id) {
        try {
            const response = await this.providersService.remove(id);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Provider deleted successfully',
                response: response,
            };
        }
        catch (errors) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                errors: errors
            };
        }
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
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "readProvider", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "uppdateProvider", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "deleteProvider", null);
ProvidersController = __decorate([
    common_1.Controller('providers'),
    __metadata("design:paramtypes", [providers_service_1.ProvidersService])
], ProvidersController);
exports.ProvidersController = ProvidersController;
//# sourceMappingURL=providers.controller.js.map