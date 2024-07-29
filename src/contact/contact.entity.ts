import { Company } from 'src/company/company.entity';
import { Note } from 'src/note/note.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tel: string;

  @Column()
  name: string;

  @Column()
  lineID: string;

  @OneToMany(() => Note, (note) => note.service, {
    cascade: false,
  })
  note: Note[]

  @OneToMany(() => Company, (company) => company.contacts, {
    cascade: false,
  })
  company: Company[]

  @CreateDateColumn()
  createAt: Date;
}