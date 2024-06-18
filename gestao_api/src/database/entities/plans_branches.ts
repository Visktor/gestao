import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Plans from "./plans";
import Branches from "./branches";

@Entity("plans_branches")
export default class LinkerPlansBranches {
  @PrimaryGeneratedColumn("uuid")
  plans_branches_id: string;

  @Column("uuid")
  plan_id: string;

  @Column("uuid")
  branch_id: string;

  @ManyToOne(() => Plans, (p) => p.branch_links, { eager: true })
  @JoinColumn({ referencedColumnName: "plan_id", name: "plan_id" })
  plan: Plans;

  @ManyToOne(() => Branches, (b) => b.plan_links, { eager: true })
  @JoinColumn({ referencedColumnName: "branch_id", name: "branch_id" })
  branch: Branches;
}
