import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AbsenceDto } from './absence.dto';
import { AbsenceService } from './absence.service';
import { TokenGetter } from './tokenGetter.decorator';


@Controller('absences')
export class AbsenceController {
    constructor(private absenceService: AbsenceService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAll(@TokenGetter() token: string) {
        return this.absenceService.getAll(token);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/availableDays')
    async getAvailableDays(@TokenGetter() token: string) {
        return this.absenceService.getAvailableDays(token);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addAbsence(@Body() body: AbsenceDto,
        @TokenGetter() token: string) {
        return this.absenceService.addAbsence(token, body);
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
