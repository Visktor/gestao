import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Users from "./users";
import Classes from "./classes";
import Equipments from "./equipments";
import Expenses from "./expenses";
import Members from "./members";
import Plans from "./plans";
import LinkerPlansBranches from "./plans_branches";

@Entity("branches")
export default class Branches {
  @PrimaryGeneratedColumn("uuid")
  branch_id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  city: string;

  @Column("varchar")
  neighborhood: string;

  @Column("varchar")
  street: string;

  @Column("varchar")
  state: string;

  @DeleteDateColumn()
  delete_date: Date;

  @OneToMany(() => Users, (u) => u.branch)
  users: Users[];

  @OneToMany(() => Classes, (c) => c.branch)
  classes: Classes[];

  @OneToMany(() => Equipments, (e) => e.branch)
  equipments: Equipments[];

  @OneToMany(() => Expenses, (e) => e.branch)
  expenses: Expenses;

  @OneToMany(() => Members, (m) => m.branch)
  members: Members[];

  @OneToMany(() => LinkerPlansBranches, lpb => lpb.branch)
  @JoinColumn({referencedColumnName: 'branch_id', name: 'branch_id'})
  plan_links: LinkerPlansBranches[]
}
