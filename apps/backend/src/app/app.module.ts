import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceModule } from './absence/absence.module';
import { UserModule } from './user/user.module';

import { AbsenceEntity } from './absence/absence.entity';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgre',
    database: 'absences',
    entities: [AbsenceEntity, UserEntity],
    migrations: [AbsenceEntity, UserEntity],
    synchronize: true,
  }),
    AbsenceModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
