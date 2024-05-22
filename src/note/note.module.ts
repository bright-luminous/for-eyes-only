import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { noteProviders } from './note.providers';
import { DatabaseModule } from 'src/database/database.module';
import { MaintenanceRecModule } from 'src/maintenanceRec/maintenanceRec.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [NoteService, ...noteProviders],
  exports: [NoteService]
})
export class NoteModule {}
