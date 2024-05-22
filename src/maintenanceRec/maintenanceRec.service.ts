import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MaintenanceRec } from './maintenanceRec.entity';
import { CreateMaintenanceRecParams } from './maintenanceRec.dto';
import { NoteService } from 'src/note/note.service';

@Injectable()
export class MaintenanceRecService {
  constructor(
    @Inject('MAINTENANCEREC_REPOSITORY')
    private maintenanceRecRepository: Repository<MaintenanceRec>,
    private readonly noteService: NoteService,
  ) {}

  async getMaintenanceRecs(): Promise<MaintenanceRec[]> {
    return this.maintenanceRecRepository.find();
  }

  async getMaintenanceRecByID(id): Promise<MaintenanceRec> {
    return this.maintenanceRecRepository.findOne({where:{id:id}},);
  }

  async createMaintenanceRec(
    createMaintenanceRecParams: CreateMaintenanceRecParams,
  ): Promise<MaintenanceRec> {
    var newMaintenanceRec = new MaintenanceRec();
    newMaintenanceRec.job = createMaintenanceRecParams.job;
    newMaintenanceRec.engineerName = createMaintenanceRecParams.engineerName;
    newMaintenanceRec.date = createMaintenanceRecParams.date;
    newMaintenanceRec.price = createMaintenanceRecParams.price;
    newMaintenanceRec.note = await this.noteService.getNoteByID(createMaintenanceRecParams.noteID)

    return await this.maintenanceRecRepository.save(newMaintenanceRec);
  }

  async deleteMaintenanceRec(id: string) {
    return await this.maintenanceRecRepository.delete(id);
  }
}
