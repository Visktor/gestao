import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Members from "./members";
import LinkerProductsSales from "./products_sales";

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

  @ManyToOne(() => Members, (m) => m.sales)
  @JoinColumn({ name: "member_id" })
  member: Members;

  @OneToMany(() => LinkerProductsSales, (lpc) => lpc.sale)
  @JoinColumn({ name: "sale_id", referencedColumnName: "sale_id" })
  product_links: LinkerProductsSales;
}
