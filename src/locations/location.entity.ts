import { ProvidersEntity } from 'src/providers/provider.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class LocationsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    locationName: string;

    @Column({ type: "simple-array" })
    locationTypes: string[];

    @Column({ type: "text" })
    googleMapsUrl: string;

    @Column({ type: "text" })
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
    google_place_id: string;

    @ManyToMany(() => ProvidersEntity)
    @JoinTable()
    providers: ProvidersEntity[];

}