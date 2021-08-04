import { ProvidersEntity } from 'src/providers/provider.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class ProviderReviewsEntity {
    @PrimaryGeneratedColumn({ type: "integer" })
    id: number;

    @Column({ type: "integer" })
    rating: number;

    @Column({ type: "text" })
    reviewBody: string;

    @ManyToOne(() => ProvidersEntity, provider => provider.reviews)
    provider: ProvidersEntity;

}