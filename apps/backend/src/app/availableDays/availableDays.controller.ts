import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AvailableDaysDto } from './availableDays.dto';
import { AvailableDaysService } from './availableDays.service';


@Controller('availableDays')
export class AvailableDaysController {
    constructor(private availableDaysService: AvailableDaysService) { }

     @Get()
     async getAvailableDays() {
         return await this.availableDaysService.getAvailableDays()
     }
 
     @Put()
    async updateAvailableDays(@Body() availableDays: AvailableDaysDto) {
         return await this.availableDaysService.updateAvailableDays(availableDays);
     }
}
