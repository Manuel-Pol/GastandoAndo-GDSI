import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Transfer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 10})
    amount: number;

    @Column()
    name: string;

    @Column()
    description: string;

    //YYYY-MM-DDTHH:mm:ss
    @Column()
    date: Date;

    @Column()
    isNegative: boolean;



    getName(): string{
        return this.name;
    }

    getAmount(): number{
        return this.amount;
    }

    getDescription(): string{
        return this.description;
    }

    getDate(): Date{
        return this.date;
    }

    getIsNegative(): boolean{
        return this.isNegative;
    }

    setName(newName: string){
        this.name = newName;
    }

    setAmount(newAmount: number){
        this.amount = newAmount;
    }

    setDescription(newDescription){
        this.description = newDescription;
    }

    setDate(newDate: Date){
        this.date = newDate;
    }
}

