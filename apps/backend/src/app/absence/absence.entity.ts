import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'absences' })
export class AbsenceEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    absenceType!: string;

    @Column({ type: 'date' })
    fromDate!: string;

    @Column({ type: 'date' })
    toDate!: string;

    @Column()
    comment!: string;
}