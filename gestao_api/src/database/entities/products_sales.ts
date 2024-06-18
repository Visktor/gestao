import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Products from "./products";
import Sales from "./sales";

@Entity("products_sales")
export default class LinkerProductsSales {
  @PrimaryGeneratedColumn("uuid")
  products_sales_id: string;

  @Column("uuid")
  product_id: string;

  @Column("uuid")
  sale_id: string;

  @ManyToOne(() => Products, (p) => p.sale_links, { eager: true})
  @JoinColumn({ name: "product_id", referencedColumnName: "product_id" })
  product: Products;

  @ManyToOne(() => Sales, (p) => p.product_links, { eager: true})
  @JoinColumn({ name: "sale_id", referencedColumnName: "sale_id" })
  sale: Sales;
}
