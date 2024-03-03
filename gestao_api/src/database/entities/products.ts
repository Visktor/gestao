import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ProductCategories from "./product_categories";
import Sales from "./sales";

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

  @ManyToOne(() => ProductCategories, (pc) => pc.product)
  product_category: ProductCategories;

  @ManyToMany(() => Sales)
  @JoinTable()
  sales: Sales[]
}
