import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'availableDays' })
export class AvailableDaysEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('simple-json')
    sick!: {
        entitlement: number,
        taken: number,
    };

    @Column('simple-json')
    vacation!: {
        entitlement: number,
        taken: number,
    };
}