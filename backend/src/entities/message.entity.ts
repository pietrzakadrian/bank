import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
  JoinColumn
} from "typeorm";

// Import Entities
import { User } from "./user.entity";
import { Template } from "./template.entity";

@Entity("messages")
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Template, template => template.nameId, { nullable: false })
  template: Template;

  @ManyToOne(type => User, user => user.id, { nullable: false })
  @JoinTable()
  sender: User;

  @ManyToOne(type => User, user => user.id, { nullable: false })
  @JoinTable()
  recipient: User;

  @CreateDateColumn()
  createdDate: Date;
}
