import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Reports from "./reports";
import Branches from "./branches";
import Roles from "./roles";
import LinkerUsersClasses from "./users_classes";

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

  @Column("varchar")
  first_name: string;

  @Column("varchar")
  last_name: string;

  @Column("uuid")
  role_id: string;

  @Column("uuid")
  branch_id: string;

  @DeleteDateColumn()
  delete_date: Date;

  @OneToMany(() => Reports, (r) => r.user, {
    eager: false,
  })
  reports: Reports[];

  @OneToMany(() => LinkerUsersClasses, luc => luc.class)
  @JoinColumn({ name: "user_id", referencedColumnName: "user_id" })
  class_links: LinkerUsersClasses[]

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
