import { Module } from '@nestjs/common';
import { maintenanceRecProviders } from './maintenanceRec.providers';
import { DatabaseModule } from 'src/database/database.module';
import { MaintenanceRecController } from './maintenanceRec.controller';
import { MaintenanceRecService } from './maintenanceRec.service';
import { NoteModule } from 'src/note/note.module';

@Module({
  imports: [DatabaseModule, NoteModule],
  controllers: [MaintenanceRecController],
  providers: [...maintenanceRecProviders, MaintenanceRecService],
  exports: [MaintenanceRecService],
})
export class MaintenanceRecModule {}
