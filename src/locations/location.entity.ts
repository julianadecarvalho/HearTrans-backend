import { ProvidersEntity } from 'src/providers/provider.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Index } from 'typeorm';
import { Geometry, Point } from 'geojson';
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

    @Index({ spatial: true })
    @Column({
        type: "geography",
        spatialFeatureType: "Point",
        srid: 4326,
        nullable: true,
    })
    locationPoint: Point

    @ManyToMany(() => ProvidersEntity)
    @JoinTable()
    providers: ProvidersEntity[];

    asDict = () => {
        return {
            id: this.id,
            locationName: this.locationName,
            locationTypes: this.locationTypes,
            googleMapsUrl: this.googleMapsUrl,
            locationUrl: this.locationUrl,
            latitude: this.latitude,
            longitude: this.longitude,
            phone: this.phone,
            address: this.address,
            providers: this.providers.forEach(location => location.asDictNoLocations())
        }
    }

    asDictNoProviders = () => {
        return {
            id: this.id,
            locationName: this.locationName,
            locationTypes: this.locationTypes,
            googleMapsUrl: this.googleMapsUrl,
            locationUrl: this.locationUrl,
            latitude: this.latitude,
            longitude: this.longitude,
            phone: this.phone,
            address: this.address,
        }
    }
}