import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { noteProviders } from './note.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CompanyModule } from 'src/company/company.module';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  imports: [DatabaseModule, CompanyModule, ContactModule],
  controllers: [NoteController],
  providers: [NoteService, ...noteProviders],
  exports: [NoteService]
})
export class NoteModule {}
