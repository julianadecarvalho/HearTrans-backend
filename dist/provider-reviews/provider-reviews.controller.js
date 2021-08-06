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
exports.ProviderReviewsController = void 0;
const common_1 = require("@nestjs/common");
const parse_int_pipe_1 = require("../common/parse-int.pipe");
const providers_service_1 = require("../providers/providers.service");
const provider_entity_1 = require("../providers/provider.entity");
const provider_reviews_service_1 = require("./provider-reviews.service");
const create_provider_review_dto_1 = require("./dto/create-provider-review.dto");
const class_validator_1 = require("class-validator");
let ProviderReviewsController = class ProviderReviewsController {
    constructor(providerReviewsService, providersService) {
        this.providerReviewsService = providerReviewsService;
        this.providersService = providersService;
    }
    async showAllProviderReviews(providerId) {
        const provider = await this.providersService.showOne(providerId);
        if (provider === undefined) {
            throw new common_1.NotFoundException('Invalid provider id');
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Provider reviews fetched successfully',
            providerId: providerId,
            providerName: provider.fullName,
            reviews: provider.reviews
        };
    }
    async createProviderReview(providerId, data) {
        const provider = await this.providersService.showOne(providerId);
        if (provider === undefined) {
            throw new common_1.NotFoundException('Invalid provider id');
        }
        try {
            data.provider = provider;
            class_validator_1.validateOrReject(data);
            const review = await this.providerReviewsService.create(data);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'ProviderReview created successfully',
                review
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
    async uppdateProviderReview(reviewId, data) {
        const review = await this.providerReviewsService.showOne(reviewId);
        if (review === undefined) {
            throw new common_1.NotFoundException('Invalid review id');
        }
        try {
            class_validator_1.validateOrReject(data);
            await this.providerReviewsService.update(reviewId, data);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Review updated successfully',
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
    async deleteProviderReview(reviewId) {
        const review = await this.providerReviewsService.showOne(reviewId);
        if (review === undefined) {
            throw new common_1.NotFoundException('Invalid review id');
        }
        await this.providersService.remove(reviewId);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Review deleted successfully',
        };
    }
};
__decorate([
    common_1.Get(':providerId'),
    __param(0, common_1.Param('providerId', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProviderReviewsController.prototype, "showAllProviderReviews", null);
__decorate([
    common_1.Post(':providerId'),
    __param(0, common_1.Param('providerId', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_provider_review_dto_1.CreateProviderReviewDto]),
    __metadata("design:returntype", Promise)
], ProviderReviewsController.prototype, "createProviderReview", null);
__decorate([
    common_1.Patch(':reviewId'),
    __param(0, common_1.Param('reviewId', new parse_int_pipe_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProviderReviewsController.prototype, "uppdateProviderReview", null);
__decorate([
    common_1.Delete(':reviewId'),
    __param(0, common_1.Param('reviewId', new parse_int_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProviderReviewsController.prototype, "deleteProviderReview", null);
ProviderReviewsController = __decorate([
    common_1.Controller('provider/reviews'),
    __param(1, common_1.Inject(common_1.forwardRef(() => providers_service_1.ProvidersService))),
    __param(1, common_1.Inject(common_1.forwardRef(() => providers_service_1.ProvidersService))),
    __metadata("design:paramtypes", [provider_reviews_service_1.ProviderReviewsService,
        providers_service_1.ProvidersService])
], ProviderReviewsController);
exports.ProviderReviewsController = ProviderReviewsController;
//# sourceMappingURL=provider-reviews.controller.js.map