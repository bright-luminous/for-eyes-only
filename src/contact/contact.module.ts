import { Module } from '@nestjs/common';
import { contactProviders } from './contact.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ContactService } from './contact.service';

@Module({
  imports: [DatabaseModule],
  providers: [...contactProviders, ContactService]
})
export class ContactModule {}
