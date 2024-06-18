import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import ProductCategories from "./product_categories";
import LinkerProductsSales from "./products_sales";

@Entity("products")
export default class Products {
  @PrimaryGeneratedColumn("uuid")
  product_id: string;

  @Column("varchar")
  name: string;

  @Column("text")
  description: string;

  @Column("money")
  price: number;

  @Column("integer")
  stock: number;

  @Column("uuid")
  product_category_id: string;

  @ManyToOne(() => ProductCategories, (pc) => pc.product)
  @JoinColumn({ name: "product_category_id" })
  product_category: ProductCategories;

  @OneToMany(() => LinkerProductsSales, (lps) => lps.product)
  @JoinColumn({ referencedColumnName: "product_id", name: "product_id" })
  sale_links: LinkerProductsSales;
}
