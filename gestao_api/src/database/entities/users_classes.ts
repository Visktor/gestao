import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Users from "./users";
import Classes from "./classes";

@Entity("users_classes")
export default class LinkerUsersClasses {
  @PrimaryGeneratedColumn("uuid")
  users_classes_id: string;

  @Column("uuid")
  class_id: string;

  @Column("uuid")
  user_id: string;

  @ManyToOne(() => Users, (u) => u.class_links, { eager: true })
  @JoinColumn({ name: "user_id", referencedColumnName: "user_id" })
  user: Users;

  @ManyToOne(() => Classes, (c) => c.user_links, { eager: true })
  @JoinColumn({ name: "class_id", referencedColumnName: "class_id" })
  class: Classes;
}
