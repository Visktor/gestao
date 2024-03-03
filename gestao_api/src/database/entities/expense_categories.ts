import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Expenses from "./expenses";

@Entity("expense_categories")
export default class ExpenseCategory {
  @PrimaryGeneratedColumn("uuid")
  expense_category_id: string;

  @Column("varchar")
  name: string;

  @OneToMany(() => Expenses, (e) => e.expense_category)
  expenses: Expenses[];
}
