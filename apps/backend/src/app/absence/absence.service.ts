import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbsenceEntity } from './absence.entity';
import { AbsenceDto } from './absence.dto'
import * as moment from 'moment';

enum AbsenceTypeEnums {
    ALL = 'all',
    SICK = 'sick',
    VACATION = 'vacation',
}

@Injectable()
export class AbsenceService {
    constructor(
        @InjectRepository(AbsenceEntity)
        private readonly absenceRepository: Repository<AbsenceEntity>
    ) { }

    SICK_ENTITLEMENT = 10;
    VACATION_ENTITLEMENT = 20;

    async getAll() {
        const absences = await this.absenceRepository.find();
        return {
            availableDays: this.getAvailableDays(absences),
            absences: absences,
        }
    }

    async addAbsence(body: AbsenceDto) {
        const absence: AbsenceEntity = new AbsenceEntity();

        absence.absenceType = body.absenceType;
        absence.fromDate = body.fromDate;
        absence.toDate = body.toDate;
        absence.comment = body.comment;

        const absences = await this.absenceRepository.save(absence);
        const newAbsences = await this.absenceRepository.find();
        return {
            availableDays: this.getAvailableDays(newAbsences),
            absences,
        }
    }

    async deleteAbsence(id: number) {
        await this.absenceRepository.delete({ id: id });
        const absences = await this.absenceRepository.find();
        const newAbsences = await this.absenceRepository.find();
        return {
            availableDays: this.getAvailableDays(absences),
            absences: newAbsences,
        }
    }

    async updateAbsence(id: number, absence: AbsenceDto) {
        await this.absenceRepository.update({
            id,
        }, {
            ...absence,
        });
        const absences = await this.absenceRepository.find();
        return {
            availableDays: this.getAvailableDays(absences),
            absences,
        }
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
                entitlement: this.SICK_ENTITLEMENT,
                taken: sickTakenDays,
            },
            vacation: {
                entitlement: this.VACATION_ENTITLEMENT,
                taken: vacationTakenDays,
            },
        }
    }

}
