import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column("uuid")
  member_id: string;

  @ManyToMany(() => Products)
  products: Products[];

  @ManyToOne(() => Members, (m) => m.sales)
  @JoinColumn({ name: "member_id" })
  member: Members;
}
