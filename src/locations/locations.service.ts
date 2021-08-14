import { Injectable, NotFoundException } from '@nestjs/common';
import { Point } from 'geojson';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationsEntity } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';


@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(LocationsEntity)
        private locationsRepository: Repository<LocationsEntity>
    ) { }

    async create(data: CreateLocationDto): Promise<LocationsEntity> {

        data = this.onLocationCreate(data);

        this.locationsRepository.create(data);
        const location = await this.locationsRepository.save(data);
        return location;
    }

    showAll(): Promise<LocationsEntity[]> {
        return this.locationsRepository.find({ relations: ["providers"] });
    }

    showOne(id: number): Promise<LocationsEntity> {
        return this.locationsRepository.findOne(id, { relations: ["providers"] });
    }

    async update(id: number, data: Partial<CreateLocationDto>): Promise<LocationsEntity> {
        var location = await this.showOne(id)
        if (location === undefined) {
            throw new NotFoundException('Invalid location id');
        }

        data = this.onLocationUpdate(data);

        location.locationName = data.locationName ? data.locationName : location.locationName;
        location.locationTypes = data.locationTypes ? data.locationTypes : location.locationTypes;
        location.googleMapsUrl = data.googleMapsUrl ? data.googleMapsUrl : location.googleMapsUrl;
        location.locationUrl = data.locationUrl ? data.locationUrl : location.locationUrl;
        location.latitude = data.latitude ? data.latitude : location.latitude;
        location.longitude = data.longitude ? data.longitude : location.longitude;
        location.phone = data.phone ? data.phone : location.phone;
        location.address = data.address ? data.address : location.address;
        location.googlePlaceId = data.googlePlaceId ? data.googlePlaceId : location.googlePlaceId;
        location.providers = data.providers ? data.providers : location.providers;

        return this.locationsRepository.save(location);
    }



    searchWithin(distance: number, lat: number, lon: number, text: string): Promise<LocationsEntity[]> {
        let origin = {
            type: "Point",
            coordinates: [lon, lat]
        };
        let locations = this.locationsRepository
            .createQueryBuilder('t_test_location')
            .select(['ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)))/1000 AS distance'])
            .where("ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)) ,:range)")
            .orderBy("distance", "ASC")
            .setParameters({
                // stringify GeoJSON
                origin: JSON.stringify(origin),
                range: distance * 1.6 //miles to KM conversion
            })
            .getRawMany();
        return locations;
    }

    async remove(id: number): Promise<void> {
        await this.locationsRepository.delete(id);
    }

    onLocationUpdate(data: Partial<CreateLocationDto>): Partial<CreateLocationDto> {
        const pointObject: Point = {
            type: "Point",
            coordinates: [data.longitude, data.latitude]
        };
        data.locationPoint = pointObject;

        // make tsvector here
        return data;
    }

    onLocationCreate(data: CreateLocationDto): CreateLocationDto {
        const pointObject: Point = {
            type: "Point",
            coordinates: [data.longitude, data.latitude]
        };
        data.locationPoint = pointObject;

        // make tsvector here
        return data;
    }
}