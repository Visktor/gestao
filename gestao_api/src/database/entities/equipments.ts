import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Branches from "./branches";

enum EquipmentCondition {
  GOOD,
  DAMAGED,
  BROKEN,
}

@Entity("equipments")
export default class Equipments {
  @PrimaryGeneratedColumn("uuid")
  equipment_id: string;

  @Column("varchar")
  name: string;

  @Column("text")
  description: string;

  @CreateDateColumn()
  purchase_date: Date;

  @Column("varchar")
  manufacturer: string;

  @Column("enum", { enum: EquipmentCondition })
  condition: EquipmentCondition;

  @Column("uuid")
  branch_id: string;

  @ManyToOne(() => Branches, (b) => b.equipments)
  @JoinColumn({ name: "branch_id" })
  branch: Branches;
}
