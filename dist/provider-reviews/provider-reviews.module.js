"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderReviewsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const provider_reviews_service_1 = require("./provider-reviews.service");
const provider_reviews_controller_1 = require("./provider-reviews.controller");
const provider_review_entity_1 = require("./provider-review.entity");
const providers_module_1 = require("../providers/providers.module");
let ProviderReviewsModule = class ProviderReviewsModule {
};
ProviderReviewsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([provider_review_entity_1.ProviderReviewsEntity]), common_1.forwardRef(() => providers_module_1.ProvidersModule)],
        providers: [provider_reviews_service_1.ProviderReviewsService],
        controllers: [provider_reviews_controller_1.ProviderReviewsController],
    })
], ProviderReviewsModule);
exports.ProviderReviewsModule = ProviderReviewsModule;
//# sourceMappingURL=provider-reviews.module.js.map