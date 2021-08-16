import { ProviderReviewsEntity } from 'src/provider-reviews/provider-review.entity';
import { LocationsEntity } from 'src/locations/location.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { ProviderResponse } from './dto/provider-response.dto';
import { ReviewResponse } from 'src/provider-reviews/dto/review-response.dto';
import { LocationResponse } from 'src/locations/dto/location-response.dto';
import { runInThisContext } from 'vm';

@Entity()
export class ProvidersEntity {
    @PrimaryGeneratedColumn({ type: "integer" })
    id: number;

    @Column({ type: "text" })
    fullName: string;

    @Column({ type: "simple-array", default: [] })
    otherNames: string[];

    @Column({ type: "text" })
    pronouns: string;

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

    @ManyToMany(() => LocationsEntity, location => location.providers)
    locations: LocationsEntity[];

    avgRating?: string

    provAsDict(): ProviderResponse {
        return {
            id: this.id,
            fullName: this.fullName,
            otherNames: this.otherNames,
            titles: this.titles,
            pronouns: this.pronouns,
            specialties: this.specialties,
            languages: this.languages,
            services: this.services,
            remoteVisits: this.remoteVisits,
            slidingScalePay: this.slidingScalePay,
            locations: this.locations ? this.locations.map(function (location: LocationsEntity): LocationResponse { return location.locAsDictNoProviders() }) : [],
            reviews: this.reviews ? this.reviews.map(function (review: ProviderReviewsEntity): ReviewResponse { return review.revAsDict() }) : [],
            avgRating: this.reviews ? (
                this.reviews.reduce((accumulator, currentReview) => accumulator + currentReview.rating, 0)
                / this.reviews.length).toFixed(1) : null
        }
    }

    provAsDictNoLocations(): ProviderResponse {
        return {
            id: this.id,
            fullName: this.fullName,
            otherNames: this.otherNames,
            pronouns: this.pronouns,
            titles: this.titles,
            specialties: this.specialties,
            languages: this.languages,
            services: this.services,
            remoteVisits: this.remoteVisits,
            slidingScalePay: this.slidingScalePay,
            reviews: this.reviews ? this.reviews.map(function (review: ProviderReviewsEntity): ReviewResponse { return review.revAsDict() }) : [],
            avgRating: this.reviews ? (
                this.reviews.reduce((accumulator, currentReview) => accumulator + currentReview.rating, 0)
                / this.reviews.length).toFixed(1) : null
        }
    }
}