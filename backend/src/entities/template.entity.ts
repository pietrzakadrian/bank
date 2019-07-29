import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
  PrimaryColumn,
  Generated
} from "typeorm";

// Import Entities
import { User } from "./user.entity";
import { Language } from "./language.entity";

@Entity("templates")
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameId: number;

  @Column()
  name: string;

  @Column()
  subject: string;

  @Column("mediumtext")
  content: string;

  @ManyToOne(type => Language, language => language.id, { nullable: false })
  @JoinTable()
  language: Language;
}
