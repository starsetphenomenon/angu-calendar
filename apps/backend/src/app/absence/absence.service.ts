/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbsenceEntity } from './absence.entity';
import { AbsenceDto } from './absence.dto';
import { AbsenceTypeEnums } from 'shared';
import * as moment from 'moment';

@Injectable()
export class AbsenceService {
    constructor(
        @InjectRepository(AbsenceEntity)
        private readonly absenceRepository: Repository<AbsenceEntity>
    ) { }

    private readonly sickEntitlement = 10;
    private readonly vacationEntitlement = 20;

    async getAll() {
        const absences = await this.absenceRepository.find();
        return absences;
    }

    async getAvailableDays() {
        const absences = await this.absenceRepository.find();
        return this.countAvailableDays(absences);
    }

    async addAbsence(body: AbsenceDto) {
        const absence: AbsenceEntity = new AbsenceEntity();
        absence.absenceType = body.absenceType;
        absence.fromDate = body.fromDate;
        absence.toDate = body.toDate;
        absence.comment = body.comment;
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
