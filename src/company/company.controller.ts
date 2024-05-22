import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyParams } from './company.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  getJobs() {
    return this.companyService.getCompanies();
  }

  @Post()
  async createNote(@Body() createCompanyParams: CreateCompanyParams){
    return this.companyService.createCompany(createCompanyParams);
  }

  @Delete()
  async deleteNote(@Query('id') id: string){
    return this.companyService.deleteCompany(id);
  }
}
