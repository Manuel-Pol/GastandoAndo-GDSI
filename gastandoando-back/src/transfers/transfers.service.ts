import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from './entities/transfer.entity';
import { Repository, UpdateResult } from 'typeorm';
import { userInfo } from 'os';

@Injectable()
export class TransfersService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
  ) {}

  async create(createTransferDto: CreateTransferDto): Promise<Transfer> {
    const { title } = createTransferDto;

    const existingTransfer = await this.transferRepository.findOne({
      where: { title },
    });
    if (existingTransfer) {
      throw new ConflictException(
        `Ya existe un movimiento con el nombre '${title}'.`,
      );
    }

    return await this.transferRepository.save(createTransferDto);
  }

  async findAll() {
    return await this.transferRepository.find();
  }

  async findOne(id: number) {
    return await this.transferRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateTransferDto: UpdateTransferDto,
  ): Promise<UpdateResult> {
    const { title } = updateTransferDto;
    if (title) {
      const existingTransfer = await this.transferRepository.findOne({
        where: { title },
      });
      if (existingTransfer) {
        throw new ConflictException(
          `Ya existe un movimiento con el nombre '${title}'.`,
        );
      }
    }

    return await this.transferRepository.update(id, updateTransferDto);
  }

  async remove(id: number) {
    return await this.transferRepository.delete(id);
  }
}
