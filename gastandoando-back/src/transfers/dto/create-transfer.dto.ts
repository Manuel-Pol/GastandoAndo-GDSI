import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateTransferDto {

    @IsNumber()
    @IsNotEmpty({message: "Debe incluir un monto."})
    @Min(0.001,  {message: 'El monto debe ser mayor que cero.'})
    amount: number;

    @IsString()
    name: string;

    @IsString()
    description: string;

    date: Date;

    isNegative: boolean;
}
