import { Injectable } from '@nestjs/common';
import { Geometry, Point } from 'geojson';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, LessThan, getConnection } from 'typeorm';
import { LocationsEntity } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';


@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(LocationsEntity)
        private locationsRepository: Repository<LocationsEntity>
    ) { }

    async create(data: CreateLocationDto): Promise<LocationsEntity> {
        this.locationsRepository.create(data);
        const location = await this.locationsRepository.save(data);
        return location;
    }

    update(id: number, data: Partial<CreateLocationDto>): Promise<LocationsEntity> {
        this.locationsRepository.update({ id }, data);
        return this.locationsRepository.findOne({ id });
    }

    showAll(): Promise<LocationsEntity[]> {
        return this.locationsRepository.find();
    }

    showOne(id: number): Promise<LocationsEntity> {
        return this.locationsRepository.findOne(id);
    }

    searchWithin(distance: number, lat: number, lon: number): Promise<LocationsEntity[]> {
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
}