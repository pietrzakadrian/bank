import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

// Import Entities
import { Language } from "./language.entity";
import { Config } from "./config.entity";

@Entity("templates")
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Config, config => config.id, { nullable: false })
  @JoinColumn({ name: "nameId" })
  name: Config;

  @Column()
  subject: string;

  @Column("mediumtext")
  content: string;

  @Column({ nullable: true })
  actions: string;

  @ManyToOne(type => Language, language => language.id, { nullable: false })
  language: Language;
}
