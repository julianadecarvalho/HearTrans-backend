import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProvidersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    readonly otherNames: string[];

    @Column() //MD, NP, etc?
    readonly titles: string[];

    @Column()
    readonly specialties: string[];

    @Column() //should we add a dropdown selector in form?
    readonly languages: string[];

}