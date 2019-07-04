import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne
} from "typeorm";
import { User } from "./user.entity";
import { Currency } from "./currency.entity";

@Entity()
@Unique(["accountBill"])
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.id)
  user: User;

  @Column("decimal")
  accountBill: number;

  @Column("double", { default: 0 })
  availableFunds: number;

  @ManyToOne(type => Currency, currency => currency.id)
  currency: Currency;
}
