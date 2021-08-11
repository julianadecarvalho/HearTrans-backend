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
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const location_entity_1 = require("./location.entity");
let LocationsService = class LocationsService {
    constructor(locationsRepository) {
        this.locationsRepository = locationsRepository;
    }
    async create(data) {
        this.locationsRepository.create(data);
        const location = await this.locationsRepository.save(data);
        return location;
    }
    update(id, data) {
        this.locationsRepository.update({ id }, data);
        return this.locationsRepository.findOne({ id });
    }
    showAll() {
        return this.locationsRepository.find();
    }
    showOne(id) {
        return this.locationsRepository.findOne(id);
    }
    searchWithin(distance, lat, lon) {
        let origin = {
            type: "Point",
            coordinates: [lon, lat]
        };
        let locations = this.locationsRepository
            .createQueryBuilder('t_test_location')
            .select(['t_test_location.city AS city', 'ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)))/1000 AS distance'])
            .where("ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)) ,:range)")
            .orderBy("distance", "ASC")
            .setParameters({
            origin: JSON.stringify(origin),
            range: distance * 1.6
        })
            .getRawMany();
        return locations;
    }
    async remove(id) {
        await this.locationsRepository.delete(id);
    }
};
LocationsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(location_entity_1.LocationsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LocationsService);
exports.LocationsService = LocationsService;
//# sourceMappingURL=locations.service.js.map