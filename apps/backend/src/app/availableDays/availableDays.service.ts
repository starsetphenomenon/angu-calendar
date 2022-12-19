import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvailableDaysEntity } from './availableDays.entity';
import { AvailableDaysDto } from './availableDays.dto'

@Injectable()
export class AvailableDaysService {
    constructor(
        @InjectRepository(AvailableDaysEntity)
        private readonly availableDaysRepository: Repository<AvailableDaysEntity>
    ) { }

    async getAvailableDays() {
        return await this.availableDaysRepository.find();
    }

    async updateAvailableDays(availableDays: AvailableDaysDto) {
        return await this.availableDaysRepository.update({
            id: 1,
        }, {
            ...availableDays,
        });
    }


}
