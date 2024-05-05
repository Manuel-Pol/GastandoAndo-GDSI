import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from './entities/transfer.entity';
import { Repository } from 'typeorm';
import { userInfo } from 'os';

@Injectable()
export class TransfersService {

  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>
  ){

  }

  async create(createTransferDto: CreateTransferDto) {
    const transfer = await this.transferRepository.save(createTransferDto);
    console.log("Transfer del lado del service:\n", transfer); 
    return transfer;
  }

  async findAll() {
    return await this.transferRepository.find();
  }

  async findOne(id: number) {
    return await this.transferRepository.findOneBy({id});
  }

  async update(id: number, updateTransferDto: UpdateTransferDto) {
    return await this.transferRepository.update(id, updateTransferDto);
  }

  async remove(id: number) {
    return await this.transferRepository.delete(id);
  }
}
