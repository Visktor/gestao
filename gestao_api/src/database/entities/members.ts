import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Plans from "./plans";
import Payments from "./payments";
import Branches from "./branches";
import Sales from "./sales";
import LinkerClassesMembers from "./classes_members";

enum Status {
  ACTIVE,
  INACTIVE,
  CANCELLED,
}

@Entity()
export default class Members {
  @PrimaryGeneratedColumn("uuid")
  member_id: string;

  @Column("varchar")
  first_name: string;

  @Column("varchar")
  last_name: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  phone_number: string;

  @CreateDateColumn()
  join_date: Date;

  @Column("uuid")
  branch_id: string;

  @Column("uuid")
  plan_id: string;

  @Column({ type: "enum", enum: Status, default: 0 })
  status: Status;

  @ManyToOne(() => Plans, (p) => p.members)
  @JoinColumn({ name: "plan_id" })
  plan: Plans;

  @OneToMany(() => Payments, (p) => p.member)
  payments: Payments[];

  @OneToMany(() => LinkerClassesMembers, (lcm) => lcm.member)
  @JoinColumn({ referencedColumnName: "member_id", name: "member_id" })
  class_links: LinkerClassesMembers;

  @ManyToOne(() => Branches, (b) => b.members)
  @JoinColumn({ name: "branch_id" })
  branch: Branches;

  @OneToMany(() => Sales, (s) => s.member)
  sales: Sales[];
}
