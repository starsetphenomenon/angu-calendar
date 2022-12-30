import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AbsenceController } from './absence.controller';
import { AbsenceEntity } from './absence.entity';
import { AbsenceService } from './absence.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AbsenceController],
  providers: [AbsenceService, JwtStrategy, UserService],
  imports: [
    TypeOrmModule.forFeature([AbsenceEntity, UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ]
})
export class AbsenceModule { }
