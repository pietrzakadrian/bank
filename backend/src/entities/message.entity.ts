import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

// Import Entities
import { User } from "./user.entity";
import { Config } from "./config.entity";

@Entity("messages")
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Config, config => config.id, { nullable: false })
  @JoinColumn({ name: "nameId" })
  name: Config;

  @ManyToOne(type => User, user => user.id, { nullable: false })
  sender: User;

  @ManyToOne(type => User, user => user.id, { nullable: false })
  recipient: User;

  @CreateDateColumn()
  createdDate: Date;
}
