import { ProviderReviewsEntity } from 'src/provider-reviews/provider-review.entity';
import { LocationsEntity } from 'src/locations/location.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class ProvidersEntity {
    @PrimaryGeneratedColumn({ type: "integer" })
    id: number;

    @Column({ type: "text" })
    fullName: string;

    @Column({ type: "simple-array", default: [] })
    otherNames: string[];

    @Column({ type: "simple-array", default: [] }) //MD, NP, etc?
    titles: string[];

    @Column({ type: "simple-array", default: [] })
    specialties: string[];

    @Column({ type: "simple-array", default: [] }) //should we add a dropdown selector in form?
    languages: string[];

    @Column({ type: "simple-array", default: [] }) //STI, HIV care, primary, therapy, etc
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

    asDict = () => {
        return {
            id: this.id,
            fullName: this.fullName,
            otherNames: this.otherNames,
            titles: this.titles,
            specialties: this.specialties,
            languages: this.languages,
            services: this.services,
            remoteVisits: this.remoteVisits,
            slidingScalePay: this.slidingScalePay,
            reviews: this.reviews,
            locations: this.locations,
            avgRating: (
                this.reviews.reduce((accumulator, currentReview) => accumulator + currentReview.rating, 0)
                / this.reviews.length).toFixed(1)
        }
    }
}