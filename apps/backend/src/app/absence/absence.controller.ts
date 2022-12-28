import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserDto } from '../user/user.dto';
import { AbsenceDto } from './absence.dto';
import { AbsenceService } from './absence.service';


@Controller('absences')
export class AbsenceController {
    constructor(private absenceService: AbsenceService) { }

    @Get()
    async getAll(@Query() query: { user: string }) {
        const user = JSON.parse(query.user)
        return this.absenceService.getAll(user);
    }

    @Get('/availableDays')
    async getAvailableDays(@Query() query: { user: string }) {
        const user = JSON.parse(query.user)
        return this.absenceService.getAvailableDays(user);
    }

    @Post()
    async addAbsence(@Body() body: { user: UserDto, absence: AbsenceDto }) {
        return this.absenceService.addAbsence(body);
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
