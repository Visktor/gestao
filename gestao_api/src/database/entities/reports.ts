import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Users from "./users";

enum ReportType {
  FINANCIAL,
  COMPLAINT,
  ACCIDENT,
}

@Entity("reports")
export default class Reports {
  @PrimaryGeneratedColumn("uuid")
  report_id: string;

  @Column("enum", { enum: ReportType })
  type: ReportType;

  @CreateDateColumn()
  created_at: Date;

  @Column("text", { nullable: true })
  attachment_url: string;

  @Column("uuid")
  user_id: string;

  @ManyToOne(() => Users, (u) => u.user_id)
  @JoinColumn({
    name: "user_id",
  })
  user: Users;
}
