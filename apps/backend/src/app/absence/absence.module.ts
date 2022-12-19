import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceController } from './absence.controller';
import { AbsenceEntity } from './absence.entity';
import { AbsenceService } from './absence.service';

@Module({
  controllers: [AbsenceController],
  providers: [AbsenceService],
  imports: [TypeOrmModule.forFeature([AbsenceEntity])]
})
export class AbsenceModule { }
