import { ProvidersEntity } from 'src/providers/provider.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Index } from 'typeorm';
import { Geometry, Point } from 'geojson';
import { LocationResponse } from './dto/location-response.dto';
import { ProviderReviewsService } from 'src/provider-reviews/provider-reviews.service';
@Entity()
export class LocationsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    locationName: string;

    @Column({ type: "simple-array", default: [] })
    locationTypes: string[];

    @Column({ type: "text" })
    googleMapsUrl: string;

    @Column({ type: "text", nullable: true })
    locationUrl: string;

    @Column({ type: "text" })
    latitude: string;

    @Column({ type: "text" })
    longitude: string;

    @Column({ type: "text" })
    phone: string;

    @Column({ type: "text" })
    address: string;

    @Column({ type: "text" })
    googlePlaceId: string;

    @Column({ type: "tsvector", nullable: true })
    tsvector: string;

    @Index({ spatial: true })
    @Column({
        type: "geography",
        spatialFeatureType: "Point",
        srid: 4326,
        nullable: true,
    })
    locationPoint: Point;

    @ManyToMany(() => ProvidersEntity, provider => provider.locations,  { cascade: true })
    @JoinTable()
    providers: ProvidersEntity[];

    locAsDict(): LocationResponse {
        return {
            id: this.id,
            locationName: this.locationName,
            locationTypes: this.locationTypes,
            googleMapsUrl: this.googleMapsUrl,
            googlePlaceId: this.googlePlaceId,
            locationUrl: this.locationUrl,
            latitude: this.latitude,
            longitude: this.longitude,
            phone: this.phone,
            address: this.address,
            locationPoint: this.locationPoint,
            providers: this.providers ? this.providers.map(provider => provider.provAsDictNoLocations()) : []
        }
    }

    locAsDictNoProviders(): LocationResponse {
        return {
            id: this.id,
            locationName: this.locationName,
            locationTypes: this.locationTypes,
            googleMapsUrl: this.googleMapsUrl,
            googlePlaceId: this.googlePlaceId,
            locationUrl: this.locationUrl,
            latitude: this.latitude,
            longitude: this.longitude,
            phone: this.phone,
            address: this.address,
            locationPoint: this.locationPoint,
        }
    }
}