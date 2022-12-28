/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async authenticateUser(user: UserDto) {
        const checkUser = await this.userRepository.findOneBy({
            email: user.email,
        });

        if (!checkUser) {
            return 'User does not exist!';
        }

        if (checkUser.password !== user.password) {
            return 'Wrong password!';
        }

        return checkUser;
    }

    async addUser(body: UserDto) {
        const userExist = await this.userRepository.findOneBy({
            email: body.email,
        });

        if (userExist && (userExist.userName === body.userName)) {
            return 'Username has already been taken';
        }

        if (userExist) {
            return 'Email has already been taken';
        }

        const user: UserEntity = new UserEntity();
        user.userName = body.userName;
        user.email = body.email;
        user.password = body.password;
        return await this.userRepository.save(user);
    }

}
