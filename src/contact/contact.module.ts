import { Module } from '@nestjs/common';
import { contactProviders } from './contact.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...contactProviders]
})
export class ContactModule {}
