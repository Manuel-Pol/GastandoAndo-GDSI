export class CreateTransferDto {
    amount: number;
    name: string;
    description: string;
    date: Date;
    isNegative: boolean;
}
