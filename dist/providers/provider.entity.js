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
exports.ProvidersEntity = void 0;
const provider_review_entity_1 = require("../provider-reviews/provider-review.entity");
const location_entity_1 = require("../locations/location.entity");
const typeorm_1 = require("typeorm");
let ProvidersEntity = class ProvidersEntity {
    constructor() {
        this.asDict = () => {
            return {
                id: this.id,
                fullName: this.fullName,
                otherNames: this.otherNames,
                titles: this.titles,
                specialties: this.specialties,
                languages: this.languages,
                services: this.services,
                remoteVisits: this.remoteVisits,
                slidingScalePay: this.slidingScalePay,
                reviews: this.reviews,
                locations: this.locations,
                avgRating: (this.reviews.reduce((accumulator, currentReview) => accumulator + currentReview.rating, 0)
                    / this.reviews.length).toFixed(1)
            };
        };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "integer" }),
    __metadata("design:type", Number)
], ProvidersEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], ProvidersEntity.prototype, "fullName", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", default: [] }),
    __metadata("design:type", Array)
], ProvidersEntity.prototype, "otherNames", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", default: [] }),
    __metadata("design:type", Array)
], ProvidersEntity.prototype, "titles", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", default: [] }),
    __metadata("design:type", Array)
], ProvidersEntity.prototype, "specialties", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", default: [] }),
    __metadata("design:type", Array)
], ProvidersEntity.prototype, "languages", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", default: [] }),
    __metadata("design:type", Array)
], ProvidersEntity.prototype, "services", void 0);
__decorate([
    typeorm_1.Column({ type: "boolean", nullable: true }),
    __metadata("design:type", Boolean)
], ProvidersEntity.prototype, "remoteVisits", void 0);
__decorate([
    typeorm_1.Column({ type: "boolean", nullable: true }),
    __metadata("design:type", Boolean)
], ProvidersEntity.prototype, "slidingScalePay", void 0);
__decorate([
    typeorm_1.OneToMany(() => provider_review_entity_1.ProviderReviewsEntity, review => review.provider),
    __metadata("design:type", Array)
], ProvidersEntity.prototype, "reviews", void 0);
__decorate([
    typeorm_1.ManyToMany(() => location_entity_1.LocationsEntity),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], ProvidersEntity.prototype, "locations", void 0);
ProvidersEntity = __decorate([
    typeorm_1.Entity()
], ProvidersEntity);
exports.ProvidersEntity = ProvidersEntity;
//# sourceMappingURL=provider.entity.js.map