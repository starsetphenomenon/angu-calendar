import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailableDaysController } from './availableDays.controller';
import { AvailableDaysEntity } from './availableDays.entity';
import { AvailableDaysService } from './availableDays.service';

@Module({
  controllers: [AvailableDaysController],
  providers: [AvailableDaysService],
  imports: [TypeOrmModule.forFeature([AvailableDaysEntity])]
})
export class AvailableDaysModule { }
