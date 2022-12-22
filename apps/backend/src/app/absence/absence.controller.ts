import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AbsenceDto } from './absence.dto';
import { AbsenceService } from './absence.service';


@Controller('absences')
export class AbsenceController {
    constructor(private absenceService: AbsenceService) { }

    @Get()
    async getAll() {
        return this.absenceService.getAll();
    }

    @Get('/availableDays')
    async getAvailableDays() {
        return this.absenceService.getAvailableDays();
    }

    @Post()
    async addAbsence(@Body() absence: AbsenceDto) {
        return this.absenceService.addAbsence(absence);
    }

    @Delete(':id')
    async deleteAbsence(@Param('id') id: number) {
        return this.absenceService.deleteAbsence(id);
    }

    @Put(':id')
    async updateAbsence(@Param('id') id: number, @Body() updateAbsence: AbsenceDto) {
        return this.absenceService.updateAbsence(id, updateAbsence);
    }
}
