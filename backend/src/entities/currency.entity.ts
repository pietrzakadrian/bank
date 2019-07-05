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

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  exchangeRate: number;

  @UpdateDateColumn({ nullable: false })
  exchangeRateSyncDate: Date;

  @Column({ default: 0 })
  main: boolean;
}
