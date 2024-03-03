import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Users from "./users";

@Entity({ name: "roles" })
export default class Roles {
  @PrimaryGeneratedColumn("uuid")
  role_id: string;

  @Column("json")
  permissions: {
    create_user: boolean;
    update_role: boolean;
    manage_equipment: boolean;
    schedule_classes: boolean;
  };

  @Column("money", { select: false })
  salary: number;

  @Column("time")
  shift_start: Date;

  @Column("time")
  shift_end: Date;

  @OneToMany(() => Users, (u) => u.role)
  users: Users[];
}
