import { Injectable, NotFoundException } from '@nestjs/common';
import { Point } from 'geojson';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { LocationsEntity } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { ProvidersEntity } from 'src/providers/provider.entity';
import { ProviderHttpModule } from 'src/providers/providers-http.module';


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
        await this.regenerateOneVector(location.id);
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

        location = this.onLocationUpdate(location);

        let newLocation = await this.locationsRepository.save(location);
        await this.regenerateOneVector(id);
        return newLocation;
    }

    searchByQuery(query: string): Promise<LocationsEntity[]> {
        let locations = this.locationsRepository
            .createQueryBuilder('location')
            .leftJoinAndSelect('location.providers', 'provider')
            .where("location.tsvector @@ websearch_to_tsquery(:query)", { query: query })
            .getMany()
        return locations;
    }

    // searchWithin(distance: number, lat: number, lon: number): Promise<LocationsEntity[]> {
    //     let origin = {
    //         type: "Point",
    //         coordinates: [lon, lat]
    //     };
    //     let locations = this.locationsRepository
    //         .createQueryBuilder('location')
    //         .leftJoinAndSelect('location.providers', 'provider')
    //         .select(['*', 'ST_Distance(location.locationPoint, ST_SetSRID(ST_GeomFromGeoJSON(:origin)::geometry, ST_SRID(location.locationPoint)::integer))/1000 AS distance'])
    //         .where("ST_DWithin(location.locationPoint, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location.locationPoint)) ,:range)")
    //         .orderBy("distance", "ASC")
    //         .setParameters({
    //             // stringify GeoJSON
    //             origin: JSON.stringify(origin),
    //             range: distance * 16090, //miles to KM conversion
    //         })
    //         .getMany();
    //     return locations;
    // }


    // searchByQueryWithin(distance: number, lat: number, lon: number, text: string): Promise<LocationsEntity[]> {
    //     let origin = {
    //         type: "Point",
    //         coordinates: [lon, lat]
    //     };
    //     let locations = this.locationsRepository
    //         .createQueryBuilder('location')
    //         .leftJoinAndSelect('location.providers', 'provider')
    //         .select(['*', 'ST_Distance(location.locationPoint, ST_SetSRID(ST_GeomFromGeoJSON(:origin)::geometry, ST_SRID(location.locationPoint)::integer))/1000 AS distance'])
    //         .where("ST_DWithin(location.locationPoint, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location.locationPoint)) ,:range) AND location.tsvector @@ websearch_to_tsquery(:query)")
    //         .orderBy("distance", "ASC")
    //         .setParameters({
    //             // stringify GeoJSON
    //             origin: JSON.stringify(origin),
    //             range: distance * 1609, //miles to KM conversion
    //             query: text,
    //         })
    //         .getMany();
    //     return locations;
    // }

    async remove(id: number): Promise<void> {
        await this.locationsRepository.delete(id);
    }

    onLocationUpdate(loc: LocationsEntity): LocationsEntity {
        const pointObject: Point = {
            type: "Point",
            coordinates: [loc.longitude, loc.latitude]
        };
        loc.locationPoint = pointObject;

        const hugeString = this.makeHugeString(loc)
        loc.hugestring = hugeString;
        return loc;
    }

    onLocationCreate(data: CreateLocationDto): CreateLocationDto {
        const pointObject: Point = {
            type: "Point",
            coordinates: [data.longitude, data.latitude]
        };
        data.locationPoint = pointObject;

        var hugeString = data.locationName + " " + data.locationTypes.join(" ");
        hugeString += " " + data.address;
        data.hugestring = hugeString.toLowerCase().replace(/\//g, " ").replace(/,/g, "");
        return data;
    }

    makeHugeString(loc: LocationsEntity): string {
        var hugeString = loc.locationName + " " + loc.locationTypes.join(" ");
        hugeString += " " + loc.address;
        hugeString += " " + loc.providers.reduce((accumulator, currentProvider) => accumulator + " " + this.makeProviderString(currentProvider), "")
        return hugeString.toLowerCase().replace(/\//g, " ").replace(/,/g, "");
    }

    makeProviderString(prov: ProvidersEntity): string {
        var provString = prov.fullName + " " + prov.languages.join(" ");
        provString += " " + prov.otherNames.join(" ");
        provString += " " + prov.pronouns;
        provString += " " + prov.services.join(" ");
        provString += " " + prov.specialties.join(" ");
        provString += " " + prov.titles.join(" ");
        return provString;
    }

    async regenerateAllVectors() {
        let locations = await getConnection()
            .createQueryBuilder()
            .update(LocationsEntity)
            .set({ tsvector: () => "to_tsvector('english'::regconfig, hugestring)" })
            .updateEntity(true)
            .execute();
    }

    async regenerateOneVector(id: number) {
        let locations = await getConnection()
            .createQueryBuilder()
            .update(LocationsEntity)
            .set({ tsvector: () => "to_tsvector('english'::regconfig, hugestring)" })
            .where("id = :id", { id: id })
            .updateEntity(true)
            .execute();
    }

}