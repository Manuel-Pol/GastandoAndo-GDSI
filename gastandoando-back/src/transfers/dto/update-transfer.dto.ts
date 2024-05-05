import { PartialType } from '@nestjs/mapped-types';
import { CreateTransferDto } from './create-transfer.dto';

export class UpdateTransferDto extends PartialType(CreateTransferDto) {
    amount?: number;
    name?: string;
    description?: string;
    date?: Date;
}
