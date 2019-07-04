import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "additionals" })
export class Additional {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.id)
  user: User;

  @Column({ default: "0,0" })
  accountBalanceHistory: string;

  @Column("double", { default: 0 })
  incomingTransfersSum: number;

  @Column("double", { default: 0 })
  outgoingTransfersSum: number;

  @Column({ default: 0 })
  notificationStatus: boolean;

  @Column({ default: 0 })
  notificationCount: number;
}
