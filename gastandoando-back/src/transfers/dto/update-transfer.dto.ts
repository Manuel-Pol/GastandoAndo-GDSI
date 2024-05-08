import { PartialType } from '@nestjs/mapped-types';
import { CreateTransferDto } from './create-transfer.dto';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class UpdateTransferDto extends PartialType(CreateTransferDto) {
  @IsNumber()
  @Min(0.001, { message: 'El monto debe ser mayor que cero.' })
  amount?: number;

  @IsString()
  title?: string;

  @IsString()
  description?: string;

  date?: Date;
}
