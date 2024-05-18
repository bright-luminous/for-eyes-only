import { Module } from '@nestjs/common';
import { companyProviders } from './company.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...companyProviders]
})
export class CompanyModule {}
