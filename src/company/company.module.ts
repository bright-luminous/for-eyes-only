import { Module } from '@nestjs/common';
import { companyProviders } from './company.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CompanyService } from './company.service';

@Module({
  imports: [DatabaseModule],
  providers: [...companyProviders, CompanyService]
})
export class CompanyModule {}
