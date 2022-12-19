export class AvailableDaysDto {
    sick!: {
        entitlement: number;
        taken: number;
    };
    vacation!: {
        entitlement: number;
        taken: number;
    };
}