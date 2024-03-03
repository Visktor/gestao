import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ExpenseCategory from "./expense_categories";
import Branches from "./branches";

@Entity("expenses")
export default class Expenses {
  @PrimaryGeneratedColumn("uuid")
  expense_id: string;

  @Column("money")
  amount: number;

  @Column("date")
  expense_date: Date;

  @Column("text")
  description: string;

  @ManyToOne(() => ExpenseCategory, (ec) => ec.expense_category_id)
  expense_category: ExpenseCategory;

  @ManyToOne(() => Branches, b => b.expenses)
  branch: Branches
}
