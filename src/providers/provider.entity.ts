import { ProviderReviewsEntity } from 'src/provider-reviews/provider-review.entity';
import { LocationsEntity } from 'src/locations/location.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class ProvidersEntity {
    @PrimaryGeneratedColumn({ type: "integer" })
    id: number;

    @Column({ type: "text" })
    fullName: string;

    @Column({ type: "simple-array" })
    otherNames: string[];

    @Column({ type: "simple-array" }) //MD, NP, etc?
    titles: string[];

    @Column({ type: "simple-array" })
    specialties: string[];

    @Column({ type: "simple-array" }) //should we add a dropdown selector in form?
    languages: string[];

    @Column({ type: "simple-array" }) //STI, HIV care, primary, therapy, etc
    services: string[];

    @Column({ type: "boolean", nullable: true })
    remoteVisits: boolean;

    @Column({ type: "boolean", nullable: true })
    slidingScalePay: boolean;

    @OneToMany(() => ProviderReviewsEntity, review => review.provider)
    reviews: ProviderReviewsEntity[];

    @ManyToMany(() => LocationsEntity)
    @JoinTable()
    locations: LocationsEntity[];
}