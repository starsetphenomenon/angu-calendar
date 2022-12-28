/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbsenceEntity } from './absence.entity';
import { AbsenceDto } from './absence.dto';
import { AbsenceTypeEnums } from 'shared';
import * as moment from 'moment';
import { UserDto } from '../user/user.dto';

@Injectable()
export class AbsenceService {
    constructor(
        @InjectRepository(AbsenceEntity)
        private readonly absenceRepository: Repository<AbsenceEntity>
    ) { }

    private readonly sickEntitlement = 10;
    private readonly vacationEntitlement = 20;

    async getAll(user: UserDto) {
        const absences = await this.absenceRepository.find({
            where: {
                user: { id: user.id }
            },
        })
        return absences;
    }

    async getAvailableDays(user: UserDto) {
        const absences = await this.absenceRepository.find({
            where: {
                user: { id: user.id }
            },
        });
        return this.countAvailableDays(absences);
    }

    async addAbsence(body: { user: UserDto, absence: AbsenceDto }) {
        const absence = await this.absenceRepository.create({
            ...body.absence,
            user: body.user,
        });
        return await this.absenceRepository.save(absence);
    }

    async deleteAbsence(id: number) {
        return await this.absenceRepository.delete({ id: id });
    }

    async updateAbsence(id: number, absence: AbsenceDto) {
        return await this.absenceRepository.update({
            id,
        }, {
            ...absence,
        });
    }

    countAvailableDays(data: AbsenceEntity[]) {
        let sickTakenDays = 0;
        let vacationTakenDays = 0;
        data.forEach((absence) => {
            if (absence.absenceType === AbsenceTypeEnums.SICK) {
                sickTakenDays +=
                    moment
                        .duration(moment(absence.toDate).diff(absence.fromDate))
                        .asDays() + 1;
            }
            if (absence.absenceType === AbsenceTypeEnums.VACATION) {
                vacationTakenDays +=
                    moment
                        .duration(moment(absence.toDate).diff(absence.fromDate))
                        .asDays() + 1;
            }
        });

        return {
            sick: {
                entitlement: this.sickEntitlement,
                taken: sickTakenDays,
            },
            vacation: {
                entitlement: this.vacationEntitlement,
                taken: vacationTakenDays,
            },
        }
    }

}
