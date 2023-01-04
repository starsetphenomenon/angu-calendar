import { IsInt, IsString } from 'class-validator';

export class AbsenceDto {
    @IsInt() id!: number;
    @IsString({ always: true }) absenceType!: string;
    @IsString({ always: true }) fromDate!: string;
    @IsString({ always: true }) toDate!: string;
    @IsString({ always: true }) comment!: string;
    @IsString({ always: true }) userName!: string;
}