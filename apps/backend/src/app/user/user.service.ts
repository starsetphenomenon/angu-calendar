/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) { }

    async loginUser(user: UserDto) {
        const userExist = await this.userRepository.findOneBy({
            email: user.email,
        });

        if (!userExist) {
            throw new UnauthorizedException('User does not exist!');
        }

        if (!await bcrypt.compare(user.password, userExist.password)) {
            throw new UnauthorizedException('Wrong password!');
        }

        return await this.jwtService.signAsync({ id: userExist.id });
    }

    async registerUser(body: UserDto) {
        const userNameExist = await this.userRepository.findOneBy({
            email: body.email,
        });

        const userEmailExist = await this.userRepository.findOneBy({
            userName: body.userName,
        });

        if (userEmailExist) {
            throw new UnauthorizedException('Username has already been taken!');
        }

        if (userNameExist) {
            throw new UnauthorizedException('Email has already been taken!');
        }

        const hashedPassword = await bcrypt.hash(body.password, 8);
        const user: UserEntity = new UserEntity();
        user.userName = body.userName;
        user.email = body.email;
        user.password = hashedPassword;
        return await this.userRepository.save(user);
    }

}
