import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { Recurrence } from '../entities/recurrence';

export class CreateTransferDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Debe incluir un monto.' })
  @Min(0.001, { message: 'El monto debe ser mayor que cero.' })
  amount: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  date: Date;

  isExpense: boolean;

  recurrence: Recurrence;

  image: string;
}
