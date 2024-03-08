import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Reports from "./reports";
import Classes from "./classes";
import Branches from "./branches";
import Roles from "./roles";

@Entity({ name: "users" })
export default class Users {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column({ unique: true, type: "varchar", length: "20" })
  username: string;

  @Column({ unique: true, type: "varchar" })
  email: string;

  @Column({ type: "varchar", length: "16", default: "123456", select: false })
  password: string;

  @Column("varchar")
  address: string;

  @Column("int")
  first_name: string;

  @Column("varchar")
  last_name: string;

  @Column("uuid")
  role_id: string;

  @Column("uuid")
  branch_id: string;

  @OneToMany(() => Reports, (r) => r.user, {
    eager: false,
  })
  reports: Reports[];

  @ManyToMany(() => Classes, { eager: false })
  classes: Classes[];

  @ManyToOne(() => Branches, (b) => b.users, {
    eager: true,
  })
  @JoinColumn({ name: "branch_id" })
  branch: Branches;

  @ManyToOne(() => Roles, (r) => r.users, {
    eager: true,
  })
  @JoinColumn({ name: "role_id" })
  role: Roles;
}
