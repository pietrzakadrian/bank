import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("config")
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
