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
exports.CreateLocationDto = void 0;
const class_validator_1 = require("class-validator");
const provider_entity_1 = require("../../providers/provider.entity");
class CreateLocationDto {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateLocationDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "locationName", void 0);
__decorate([
    class_validator_1.IsString({ each: true }),
    __metadata("design:type", Array)
], CreateLocationDto.prototype, "locationTypes", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "googleMapsUrl", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "locationUrl", void 0);
__decorate([
    class_validator_1.IsLatitude(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "latitude", void 0);
__decorate([
    class_validator_1.IsLongitude(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "longitude", void 0);
__decorate([
    class_validator_1.IsPhoneNumber('US'),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "phone", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "google_place_id", void 0);
exports.CreateLocationDto = CreateLocationDto;
//# sourceMappingURL=create-location.dto.js.map