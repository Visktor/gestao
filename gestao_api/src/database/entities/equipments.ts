import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import Branches from "./branches";

enum EquipmentCondition {
  GOOD,
  DAMAGED,
  BROKEN
}

@Entity('equipments')
export default class Equipments {
 @PrimaryGeneratedColumn('uuid')
  equipment_id: string;

  @Column("varchar")
  name: string;

  @Column("text")
  description: string;

  @CreateDateColumn()
  purchase_date: Date;

  @Column("varchar")
  manufacturer: string;

  @Column("enum", { enum: EquipmentCondition})
  condition: EquipmentCondition;

 @ManyToOne(() => Branches, b => b.equipments)
 branch: Branches
}
