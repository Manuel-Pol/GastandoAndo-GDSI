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

    @Column()
    date: Date;

    @Column()
    isNegative: boolean;
}

