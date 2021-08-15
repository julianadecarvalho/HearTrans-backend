import { ProvidersEntity } from 'src/providers/provider.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ReviewResponse } from './dto/review-response.dto';

@Entity()
export class ProviderReviewsEntity {
    @PrimaryGeneratedColumn({ type: "integer" })
    id: number;

    @Column({ type: "integer" })
    rating: number;

    @Column({ type: "text" })
    reviewBody: string;

    @Column({ type: "simple-array", default: [] })
    contentWarnings: string[]

    @ManyToOne(() => ProvidersEntity, provider => provider.reviews, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    provider: ProvidersEntity;

    revAsDict(): ReviewResponse {
        return {
            id: this.id,
            rating: this.rating,
            reviewBody: this.reviewBody,
            contentWarnings: this.contentWarnings,
        }
    }
}