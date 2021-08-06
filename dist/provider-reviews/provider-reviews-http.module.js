"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderReviewHttpModule = void 0;
const common_1 = require("@nestjs/common");
const provider_reviews_module_1 = require("./provider-reviews.module");
const provider_reviews_service_1 = require("./provider-reviews.service");
const provider_reviews_controller_1 = require("./provider-reviews.controller");
let ProviderReviewHttpModule = class ProviderReviewHttpModule {
};
ProviderReviewHttpModule = __decorate([
    common_1.Module({
        imports: [provider_reviews_module_1.ProviderReviewsModule],
        providers: [provider_reviews_service_1.ProviderReviewsService],
        controllers: [provider_reviews_controller_1.ProviderReviewsController]
    })
], ProviderReviewHttpModule);
exports.ProviderReviewHttpModule = ProviderReviewHttpModule;
//# sourceMappingURL=provider-reviews-http.module.js.map