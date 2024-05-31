import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyParams } from './company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<Company>,
  ) {}

  async getCompanies(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async getCompanyByID(id: string): Promise<Company> {
    return await this.companyRepository.findOne({where:{id:id}},);
  }

  async createCompany(createCompanyParams: CreateCompanyParams): Promise<Company> {
    var newCompany = new Company();
    newCompany.name = createCompanyParams.name;

    return await this.companyRepository.save(newCompany);
  }

  async deleteCompany(id: string) {
    return await this.companyRepository.delete(id);
  }
}
