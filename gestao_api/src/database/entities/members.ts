import {
  Column,
  CreateDateColumn,
  Entity,
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
  fk_membership_type: string;

  @Column({ type: "enum", enum: Status, default: 0 })
  status: Status;

  @OneToMany(() => Plans, (p) => p.member)
  plans: Plans[];

  @OneToMany(() => Payments, (p) => p.member)
  payments: Payments[];

  @ManyToMany(() => Classes)
  classes: Classes[]

  @ManyToOne(() => Branches, b => b.members)
  branch: Branches

  @OneToMany(() => Sales, s => s.member)
  sales: Sales[]
}
