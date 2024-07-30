import { Note } from 'src/note/note.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class MaintenanceRec {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  job: string;

  @Column()
  engineerName: string;

  @Column()
  date: Date;

  @Column('decimal', { precision: 8, scale: 2 })
  price: number;

  @ManyToOne(() => Note, (note) => note.maintenanceRec, {
    onDelete: 'CASCADE',
  })
  note: Note;

  @CreateDateColumn()
  createAt: Date;
}
