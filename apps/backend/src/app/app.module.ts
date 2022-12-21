import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceModule } from './absence/absence.module';

import { AppController } from './app.controller';
import { AbsenceEntity } from './absence/absence.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db.thin.dev',
    port: 5432,
    username: 'bIQhpdhPUbQoiXVeUIAXCXJwbCKVKKxK',
    password: 'DFhsQtxeHASiSDjuPYThLPJrPInbPBMb',
    database: 'c3fd690d-1f53-4b5a-a611-2858d5be6e41',
    entities: [AbsenceEntity],
    migrations: [AbsenceEntity],
    synchronize: true,
  }),
    AbsenceModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
