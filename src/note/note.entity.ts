import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Company } from 'src/company/company.entity';
import { Contact } from 'src/contact/contact.entity';
import { MaintenanceRec } from 'src/maintenanceRec/maintenanceRec.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  noteName: string;

  @Column({length: 30})
  type: string;

  @Column({ length: 100 })
  brand: string;

  @Column({ length: 100 })
  model: string;

  @Column('decimal', { precision: 2, scale: 2 })
  price: number;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;

  @ManyToOne(() => Contact, (contact) => contact.id)
  service: Contact;

  @OneToMany(() => MaintenanceRec, (maintenanceRec) => maintenanceRec.id)
  maintenanceRec: MaintenanceRec[];

  @Column()
  notification: Date;

  @Column()
  notificationPeriod: number;

  @Column()
  note: string;
}