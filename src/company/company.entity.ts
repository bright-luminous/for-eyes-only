import { Contact } from 'src/contact/contact.entity';
import { Note } from 'src/note/note.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Contact, (contact) => contact.id)
  contacts: Contact;

  @OneToMany(() => Note, (note) => note.company, {
    cascade: false,
  })
  note: Note[]

  @CreateDateColumn()
  createAt: Date;
}