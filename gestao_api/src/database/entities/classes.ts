import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Branches from "./branches";
import LinkerClassesMembers from "./classes_members";
import LinkerUsersClasses from "./users_classes";

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

  @Column("uuid")
  branch_id: string;

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

  @OneToMany(() => LinkerUsersClasses, (luc) => luc.class)
  @JoinColumn({ name: "class_id", referencedColumnName: "class_id" })
  user_links: LinkerUsersClasses[];

  @OneToMany(() => LinkerClassesMembers, (lcm) => lcm.class)
  @JoinColumn({ referencedColumnName: "class_id", name: "class_id" })
  member_links: LinkerClassesMembers[];

  @ManyToOne(() => Branches, (b) => b.classes)
  @JoinColumn({ name: "branch_id" })
  branch: Branches;
}
