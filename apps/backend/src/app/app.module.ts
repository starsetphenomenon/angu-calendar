import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceModule } from './absence/absence.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AbsenceEntity } from './absence/absence.entity';
import { AvailableDaysEntity } from './availableDays/availableDays.entity';
import { AvailableDaysModule } from './availableDays/availableDays.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db.thin.dev',
    port: 5432,
    username: 'bIQhpdhPUbQoiXVeUIAXCXJwbCKVKKxK',
    password: 'DFhsQtxeHASiSDjuPYThLPJrPInbPBMb',
    database: 'c3fd690d-1f53-4b5a-a611-2858d5be6e41',
    entities: [AbsenceEntity, AvailableDaysEntity],
    migrations: [AbsenceEntity, AvailableDaysEntity],
    synchronize: true,
  }),
    AbsenceModule,
    AvailableDaysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
