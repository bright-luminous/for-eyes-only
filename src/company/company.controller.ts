import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyParams, CreateCompanyWithContactParams } from './company.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  getJobs() {
    return this.companyService.getCompanies();
  }

  @Get("contact")
  getJobsWithContact() {
    return this.companyService.getCompanyWithMaintenance();
  }

  @Post()
  async createNote(@Body() createCompanyParams: CreateCompanyParams){
    return this.companyService.createCompany(createCompanyParams);
  }

  @Post("withContact")
  async createNoteWithContact(@Body() createCompanyWithContactParams: CreateCompanyWithContactParams){
    return this.companyService.createCompanyWithContact(createCompanyWithContactParams);
  }

  @Delete()
  async deleteNote(@Query('id') id: string){
    return this.companyService.deleteCompany(id);
  }
}
