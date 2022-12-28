import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbsenceEntity } from "../absence/absence.entity";

@Entity({ name: 'usersTable' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    userName!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @OneToMany(() => AbsenceEntity, (absence) => absence.user,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    absences!: AbsenceEntity[];
}