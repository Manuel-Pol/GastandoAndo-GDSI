import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Recurrence } from './recurrence';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 10 })
  amount: number;

  @Column()
  title: string;

  @Column()
  description: string;

  //YYYY-MM-DDTHH:mm:ss
  @Column()
  date: Date;

  @Column()
  isExpense: boolean;

  @Column({ default: Recurrence.NonRecurrent })
  recurrence: Recurrence;

  @Column({ default: '' })
  image: string;

  getTitle(): string {
    return this.title;
  }

  getAmount(): number {
    return this.amount;
  }

  getDescription(): string {
    return this.description;
  }

  getDate(): Date {
    return this.date;
  }

  getIsExpense(): boolean {
    return this.isExpense;
  }

  setTitle(newTitle: string) {
    this.title = newTitle;
  }

  setAmount(newAmount: number) {
    this.amount = newAmount;
  }

  setDescription(newDescription: string) {
    this.description = newDescription;
  }

  setDate(newDate: Date) {
    this.date = newDate;
  }
}
