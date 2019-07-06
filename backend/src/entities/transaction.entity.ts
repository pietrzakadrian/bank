import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from "typeorm";
import { Bill } from "./bill.entity";
import { Currency } from "./currency.entity";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Bill, sender => sender.user, { nullable: false })
  sender: Bill;

  @ManyToOne(type => Bill, recipient => recipient.user, { nullable: false })
  recipient: Bill;

  @CreateDateColumn()
  createdDate: Date;

  @Column("double")
  amountMoney: number;

  @ManyToOne(type => Currency, currency => currency.id, { nullable: false })
  currency: Currency;

  @Column()
  transferTitle: string;

  @Column()
  authorizationKey: string;

  @Column("boolean", { default: 0 })
  authorizationStatus: boolean;
}
