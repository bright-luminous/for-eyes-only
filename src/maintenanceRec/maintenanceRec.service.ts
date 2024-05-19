import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MaintenanceRec } from './maintenanceRec.entity';
import { CreateMaintenanceRecParams } from './maintenanceRec.dto';

@Injectable()
export class MaintenanceRecService {
  constructor(
    @Inject('MAINTENANCEREC_REPOSITORY')
    private maintenanceRecRepository: Repository<MaintenanceRec>,
  ) {}

  async getContacts(): Promise<MaintenanceRec[]> {
    return this.maintenanceRecRepository.find();
  }

  async createContact(
    createMaintenanceRecParams: CreateMaintenanceRecParams,
  ): Promise<MaintenanceRec> {
    var newMaintenanceRec = new MaintenanceRec();
    newMaintenanceRec.job = createMaintenanceRecParams.job;
    newMaintenanceRec.engineerName = createMaintenanceRecParams.engineerName;
    newMaintenanceRec.date = createMaintenanceRecParams.date;
    newMaintenanceRec.price = createMaintenanceRecParams.price;

    return await this.maintenanceRecRepository.save(newMaintenanceRec);
  }

  async deleteContact(id: string) {
    return await this.maintenanceRecRepository.delete(id);
  }
}
