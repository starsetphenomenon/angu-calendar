import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';


@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('login')
    async loginUser(@Body() user: UserDto) {
        return this.userService.loginUser(user);
    }

    @Post('register')
    async registerUser(@Body() user: UserDto) {
        return this.userService.registerUser(user);
    }

}
