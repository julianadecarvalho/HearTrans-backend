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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderReviewsEntity = void 0;
const provider_entity_1 = require("../providers/provider.entity");
const typeorm_1 = require("typeorm");
let ProviderReviewsEntity = class ProviderReviewsEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "integer" }),
    __metadata("design:type", Number)
], ProviderReviewsEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "integer" }),
    __metadata("design:type", Number)
], ProviderReviewsEntity.prototype, "rating", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], ProviderReviewsEntity.prototype, "reviewBody", void 0);
__decorate([
    typeorm_1.ManyToOne(() => provider_entity_1.ProvidersEntity, provider => provider.reviews),
    __metadata("design:type", provider_entity_1.ProvidersEntity)
], ProviderReviewsEntity.prototype, "provider", void 0);
ProviderReviewsEntity = __decorate([
    typeorm_1.Entity()
], ProviderReviewsEntity);
exports.ProviderReviewsEntity = ProviderReviewsEntity;
//# sourceMappingURL=provider-review.entity.js.map