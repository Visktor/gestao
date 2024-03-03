import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Products from "./products";
import Members from "./members";

@Entity("sales")
export default class Sales {
  @PrimaryGeneratedColumn("uuid")
  sale_id: string;

  @CreateDateColumn()
  date: Date;

  @Column("varchar")
  buyer_email: string;

  @Column("varchar")
  buyer_name: string;

  @Column("varchar")
  buyer_phone: string;

  @ManyToMany(() => Products)
  products: Products[];

  @ManyToOne(() => Members, (m) => m.sales)
  member: Members;
}
