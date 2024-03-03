import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Members from "./members";

// TODO: Add different payment methods
enum PaymentMethods {
  CASH,
  CREDIT_CARD,
}

@Entity("payments")
export default class Payments {
  @PrimaryGeneratedColumn("uuid")
  payment_id: string;

  @Column("uuid")
  fk_member_id: string;

  // TODO: Find out if this returns a string or a number.
  @Column("money")
  amount: number;

  @Column("date")
  payment_date: Date;

  @Column("enum", { enum: PaymentMethods })
  payment_method: PaymentMethods;

  @ManyToOne(() => Members, (u) => u.member_id)
  member: Members;
}
