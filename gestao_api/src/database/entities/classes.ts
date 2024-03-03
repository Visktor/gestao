import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Users from "./users";
import Members from "./members";
import Branches from "./branches";

enum ClassType {
  YOGA,
  CARDIO,
  DANCE,
  BOXING,
}

@Entity("classes")
export default class Classes {
  @PrimaryGeneratedColumn("uuid")
  class_id: string;

  @Column("varchar")
  name: string;

  @Column("enum", {
    enum: ClassType,
  })
  class_type: ClassType;

  @Column("time")
  start_time: Date;

  @Column("time")
  end_time: Date;

  @Column("json")
  days_offered: {
    [key in
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"]: boolean;
  };

  @ManyToMany(() => Users, { onDelete: "CASCADE" })
  @JoinTable()
  users: Users[];

  @ManyToMany(() => Members, { onDelete: "CASCADE" })
  @JoinTable()
  members: Members[];

  @ManyToOne(() => Branches, (b) => b.classes)
  branch: Branches;
}
