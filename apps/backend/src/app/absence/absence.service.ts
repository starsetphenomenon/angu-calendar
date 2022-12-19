import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbsenceEntity } from './absence.entity';
import { AbsenceDto } from './absence.dto'

@Injectable()
export class AbsenceService {
    constructor(
        @InjectRepository(AbsenceEntity)
        private readonly absenceRepository: Repository<AbsenceEntity>
    ) { }


    async getAll() {
        return this.absenceRepository.find();
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
        await this.absenceRepository.delete({ id: id });
        return this.absenceRepository.find();
    }

    async updateAbsence(id: number, absence: AbsenceDto) {
        await this.absenceRepository.update({
            id,
        }, {
            ...absence,
        });
        return this.absenceRepository.find();
    }
}
