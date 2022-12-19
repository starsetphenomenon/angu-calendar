import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'absences' })
export class AbsenceEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    absenceType!: string;

    @Column()
    fromDate!: string;

    @Column()
    toDate!: string;

    @Column()
    comment!: string;
}