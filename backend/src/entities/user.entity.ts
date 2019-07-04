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

@Entity()
@Unique(["email", "login"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column("bigint")
  login: number;

  @Column()
  password: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  lastPresentLogged: Date;

  @UpdateDateColumn()
  lastSuccessfulLogged: Date;

  @UpdateDateColumn()
  lastFailedLogged: Date;

  async setPassword(newPassword: string) {
    this.password = await bcrypt.hash(newPassword, 10);
  }

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
