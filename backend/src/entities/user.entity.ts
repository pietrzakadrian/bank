import bcrypt from "bcryptjs";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique
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

  @Column({ nullable: true })
  lastPresentLoggedDate: Date;

  @Column({ nullable: true })
  lastSuccessfulLoggedDate: Date;

  @Column({ nullable: true })
  lastFailedLoggedDate: Date;

  async setPassword(newPassword: string) {
    this.password = await bcrypt.hash(newPassword, 10);
  }

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
