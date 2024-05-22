import { Module } from '@nestjs/common';
import { contactProviders } from './contact.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactController],
  providers: [...contactProviders, ContactService]
})
export class ContactModule {}
