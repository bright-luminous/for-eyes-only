import { Module } from '@nestjs/common';
import { companyProviders } from './company.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  imports: [DatabaseModule, ContactModule],
  controllers: [CompanyController],
  providers: [...companyProviders, CompanyService],
  exports: [CompanyService]
})
export class CompanyModule {}
