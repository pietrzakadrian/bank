import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("languages")
@Unique(["code"])
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;
}
