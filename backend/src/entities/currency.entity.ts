import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";

@Entity("currency")
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("double", { default: 1 })
  exchangeRate: number;

  @CreateDateColumn()
  exchangeRateSyncDate: Date;

  @Column({ default: 0 })
  main: boolean;
}
