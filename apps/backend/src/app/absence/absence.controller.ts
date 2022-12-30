import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AbsenceDto } from './absence.dto';
import { AbsenceService } from './absence.service';


@Controller('absences')
export class AbsenceController {
    constructor(private absenceService: AbsenceService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAll(@Headers() headers: { authorization: string }) {
        return this.absenceService.getAll(headers.authorization.slice(7));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/availableDays')
    async getAvailableDays(@Headers() headers: { authorization: string }) {
        return this.absenceService.getAvailableDays(headers.authorization.slice(7));
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addAbsence(@Body() body: { userToken: string, absence: AbsenceDto }) {
        return this.absenceService.addAbsence(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteAbsence(@Param('id') id: number) {
        return this.absenceService.deleteAbsence(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updateAbsence(@Param('id') id: number, @Body() updateAbsence: AbsenceDto) {
        return this.absenceService.updateAbsence(id, updateAbsence);
    }
}
