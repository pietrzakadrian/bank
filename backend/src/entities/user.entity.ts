import bcrypt from "bcryptjs";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from "typeorm";

@Entity("users")
@Unique(["email", "login"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column("bigint")
  login: number;

  @Column()
  password: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  lastPresentLoggedDate: Date;

  @UpdateDateColumn({ nullable: true })
  lastSuccessfulLoggedDate: Date;

  @UpdateDateColumn({ nullable: true })
  lastFailedLoggedDate: Date;

  async setPassword(newPassword: string) {
    this.password = await bcrypt.hash(newPassword, 10);
  }

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
