import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne
} from "typeorm";

// Import Entities
import { User } from "./user.entity";
import { Currency } from "./currency.entity";

@Entity("bills")
@Unique(["accountBill"])
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.id, { nullable: false })
  user: User;

  @Column({ length: 26 })
  accountBill: string;

  @Column("double", { default: 0 })
  availableFunds: Decimal;

  @ManyToOne(type => Currency, currency => currency.id, { nullable: false })
  currency: Currency;
}
