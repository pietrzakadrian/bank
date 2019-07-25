import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

// Import Entities
import { User } from "./user.entity";

@Entity("additionals")
export class Additional {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.id, { nullable: false })
  user: User;

  @Column({ length: 20000, default: "0,0" })
  accountBalanceHistory: string;

  @Column("decimal", { precision: 13, scale: 2, default: 0 })
  incomingTransfersSum: number;

  @Column("decimal", { precision: 13, scale: 2, default: 0 })
  outgoingTransfersSum: number;

  @Column({ default: 0 })
  notificationStatus: boolean;

  @Column({ default: 0 })
  notificationCount: number;

  @Column({ default: 0 })
  messageStatus: boolean;

  @Column({ default: 0 })
  messageCount: number;
}
