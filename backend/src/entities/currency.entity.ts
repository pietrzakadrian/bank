import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("currency")
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  exchangeRate: number;

  @UpdateDateColumn()
  exchangeRateSyncDate: Date;

  @Column({ default: 0 })
  main: boolean;
}
