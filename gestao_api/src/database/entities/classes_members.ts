import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Classes from "./classes";
import Members from "./members";

@Entity("classes_members")
export default class LinkerClassesMembers {
  @PrimaryGeneratedColumn("uuid")
  classes_members_id: string;

  @Column("uuid")
  class_id: string;

  @Column("uuid")
  member_id: string;

  @ManyToOne(() => Classes, (c) => c.member_links, { eager: true})
  @JoinColumn({ referencedColumnName: 'class_id', name: 'class_id'})
  class: Classes;

  @ManyToOne(() => Members, (m) => m.class_links, { eager: true})
  @JoinColumn({ referencedColumnName: 'member_id', name: 'member_id'})
  member: Members;
}
