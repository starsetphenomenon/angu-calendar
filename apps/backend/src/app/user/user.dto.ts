import { IsInt, IsString } from 'class-validator';

export class UserDto {
    @IsInt() id?: number;
    @IsString({ always: true }) email!: string;
    @IsString({ always: true }) userName!: string;
    @IsString({ always: true }) password!: string;
}