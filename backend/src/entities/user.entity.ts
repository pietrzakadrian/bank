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

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  email: string;

  @Column("bigint", { nullable: false })
  login: number;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn({ nullable: false })
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
