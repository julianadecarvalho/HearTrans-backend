import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProvidersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

}