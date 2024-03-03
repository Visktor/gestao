import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Products from "./products";

@Entity('product_categories')
export default class ProductCategories {
  @PrimaryGeneratedColumn("uuid")
  product_categories_id: string;

  @Column("varchar")
  name: string;

  @OneToMany(() => Products, (p) => p.product_category)
  product: Products[];
}
