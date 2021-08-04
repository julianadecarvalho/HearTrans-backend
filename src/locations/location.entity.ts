import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LocationsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    locationName: string;

    @Column()
    locationTypes: string[];

    @Column()
    url: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    google_place_id: string;

}