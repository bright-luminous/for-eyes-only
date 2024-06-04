import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Company } from 'src/company/company.entity';
import { Contact } from 'src/contact/contact.entity';
import { MaintenanceRec } from 'src/maintenanceRec/maintenanceRec.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  noteName: string;

  @Column({ length: 30 })
  type: string;

  @Column({ length: 100 })
  brand: string;

  @Column({ length: 100 })
  model: string;

  @Column('decimal', { precision: 2, scale: 2 })
  price: number;

  @ManyToOne(() => Company, (company) => company.note)
  company: Company;

  @ManyToOne(() => Contact, (contact) => contact.note)
  service: Contact;

  @OneToMany(() => MaintenanceRec, (maintenanceRec) => maintenanceRec.note, {
    cascade: true,
  })
  maintenanceRec: MaintenanceRec[];

  @Column()
  notification: Date;

  @Column()
  notificationPeriod: number;

  @Column()
  note: string;

  @CreateDateColumn()
  createAt: Date;
}
