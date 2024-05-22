import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { MaintenanceRecService } from './maintenanceRec.service';
import { CreateMaintenanceRecParams } from './maintenanceRec.dto';

@Controller('maintenanceRec')
export class MaintenanceRecController {
  constructor(private maintenanceRecService: MaintenanceRecService) {}

  @Get()
  getJobs() {
    return this.maintenanceRecService.getMaintenanceRecs();
  }

  @Post()
  async createNote(@Body() createMaintenanceRecParams: CreateMaintenanceRecParams){
    return this.maintenanceRecService.createMaintenanceRec(createMaintenanceRecParams);
  }

  @Delete()
  async deleteNote(@Query('id') id: string){
    return this.maintenanceRecService.deleteMaintenanceRec(id);
  }
}
