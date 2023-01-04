import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

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

    @ManyToOne(() => UserEntity, (user) => user.absences)
    user!: UserEntity;
}