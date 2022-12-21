import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbsenceEntity } from './absence.entity';
import { AbsenceDto } from './absence.dto'
import { AbsenceTypeEnums } from '../../../../../libs/shared/absence/absence.model';
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
        return { absences };
    }

    async getDays() {
        const absences = await this.absenceRepository.find();
        return this.getAvailableDays(absences);
    }

    async addAbsence(body: AbsenceDto) {
        const absence: AbsenceEntity = new AbsenceEntity();
        absence.absenceType = body.absenceType;
        absence.fromDate = body.fromDate;
        absence.toDate = body.toDate;
        absence.comment = body.comment;
        await this.absenceRepository.save(absence);
    }

    async deleteAbsence(id: number) {
        await this.absenceRepository.delete({ id: id });

    }

    async updateAbsence(id: number, absence: AbsenceDto) {
        await this.absenceRepository.update({
            id,
        }, {
            ...absence,
        });
    }

    getAvailableDays(data: AbsenceEntity[]) {
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
