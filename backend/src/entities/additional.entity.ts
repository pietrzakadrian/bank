import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne
} from "typeorm";
import { User } from "./user.entity";

@Entity("additionals")
export class Additional {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.id, { nullable: false })
  user: Number;

  @Column({ length: 20000, default: "0,0" })
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
