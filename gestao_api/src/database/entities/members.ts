import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Plans from "./plans";
import Payments from "./payments";
import Classes from "./classes";
import Branches from "./branches";
import Sales from "./sales";

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

  @ManyToMany(() => Classes)
  classes: Classes[];

  @ManyToOne(() => Branches, (b) => b.members)
  @JoinColumn({ name: "branch_id" })
  branch: Branches;

  @OneToMany(() => Sales, (s) => s.member)
  sales: Sales[];
}
