import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';


@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getUser(@Query() query: { user: string }) {
        const user = JSON.parse(query.user)
        return this.userService.authenticateUser(user);
    }

    @Post()
    async addUser(@Body() user: UserDto) {
        return this.userService.addUser(user);
    }

}
