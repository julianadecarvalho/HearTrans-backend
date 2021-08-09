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
exports.LocationsEntity = void 0;
const provider_entity_1 = require("../providers/provider.entity");
const typeorm_1 = require("typeorm");
let LocationsEntity = class LocationsEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], LocationsEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], LocationsEntity.prototype, "locationName", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array" }),
    __metadata("design:type", Array)
], LocationsEntity.prototype, "locationTypes", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], LocationsEntity.prototype, "googleMapsUrl", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], LocationsEntity.prototype, "locationUrl", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], LocationsEntity.prototype, "latitude", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], LocationsEntity.prototype, "longitude", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], LocationsEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], LocationsEntity.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], LocationsEntity.prototype, "google_place_id", void 0);
__decorate([
    typeorm_1.ManyToMany(() => provider_entity_1.ProvidersEntity),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], LocationsEntity.prototype, "providers", void 0);
LocationsEntity = __decorate([
    typeorm_1.Entity()
], LocationsEntity);
exports.LocationsEntity = LocationsEntity;
//# sourceMappingURL=location.entity.js.map