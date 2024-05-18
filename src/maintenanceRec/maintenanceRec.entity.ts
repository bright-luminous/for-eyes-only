import { Note } from 'src/note/note.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class MaintenanceRec {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  job: string;

  @Column()
  engineerName: string;

  @Column()
  date: string;

  @Column()
  price: number;

  @ManyToOne(() => Note, (note) => note.id)
  note: Note;
}