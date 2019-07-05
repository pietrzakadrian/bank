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

  @ManyToOne(type => Bill, sender => sender.user)
  sender: Bill;

  @ManyToOne(type => Bill, recipient => recipient.user)
  recipient: Bill;

  @CreateDateColumn({ nullable: false })
  createdDate: Date;

  @Column("double", { nullable: false })
  amountMoney: number;

  @ManyToOne(type => Currency, currency => currency.id)
  currency: Currency;

  @Column({ nullable: false })
  transferTitle: string;

  @Column({ nullable: false })
  authorizationKey: string;

  @Column("boolean", { default: 0 })
  authorizationStatus: boolean;
}
