import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';
import { ContactModule } from './contact/contact.module';
import { MaintenanceRecProvidersModule } from './maintenanceRec/maintenanceRec.module';

@Module({
  imports: [
    NoteModule,
    DatabaseModule,
    CompanyModule,
    ContactModule,
    MaintenanceRecProvidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
