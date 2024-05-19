import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';
import { ContactModule } from './contact/contact.module';
import { MaintenanceRecModule } from './maintenanceRec/maintenanceRec.module';

@Module({
  imports: [
    NoteModule,
    DatabaseModule,
    CompanyModule,
    ContactModule,
    MaintenanceRecModule,
  ],
})
export class AppModule {}
