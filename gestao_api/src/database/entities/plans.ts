import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";
import Members from "./members";
import LinkerPlansBranches from "./plans_branches";

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

  @DeleteDateColumn()
  delete_date: Date;

  @OneToMany(() => Members, (m) => m.member_id)
  members: Members[];

  @OneToMany(() => LinkerPlansBranches, (lpb) => lpb.plan, { cascade: true })
  @JoinColumn({ referencedColumnName: "plan_id", name: "plan_id" })
  branch_links: LinkerPlansBranches[];
}
