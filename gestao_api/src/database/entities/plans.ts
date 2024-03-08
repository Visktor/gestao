import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from "typeorm";
import Members from "./members";
import Branches from "./branches";

@Entity("plans")
export default class Plans {
  @PrimaryGeneratedColumn("uuid")
  plan_id: string;

  @Column("varchar", { unique: true })
  name: string;

  @Column("money")
  monthly_fee: number;

  /** integer, represents contract duration in months. */
  @Column("integer")
  duration: number;

  @Column("uuid")
  member_id: string;

  @ManyToOne(() => Members, (m) => m.member_id)
  @JoinColumn({ name: "member_id" })
  member: Members;

  @ManyToMany(() => Branches)
  branches: Branches;
}
