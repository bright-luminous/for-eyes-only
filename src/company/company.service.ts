import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyParams, CreateCompanyWithContactParams } from './company.dto';
import { ContactService } from 'src/contact/contact.service';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<Company>,
    private readonly contactService: ContactService
  ) {}

  async getCompanies(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async getCompanyWithMaintenance(): Promise<Company[]> {
    const returnCompany = await this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.contacts', 'contacts')
      .getMany();

    return returnCompany;
  }

  async getCompanyByID(id: string): Promise<Company> {
    return await this.companyRepository.findOne({where:{id:id}},);
  }

  async createCompany(createCompanyParams: CreateCompanyParams): Promise<Company> {
    var newCompany = new Company();
    newCompany.name = createCompanyParams.name;

    return await this.companyRepository.save(newCompany);
  }

  async createCompanyWithContact(createCompanyWithContactParams: CreateCompanyWithContactParams): Promise<Company> {
    var newCompany = new Company();
    newCompany.name = createCompanyWithContactParams.name;
    newCompany.contacts = await this.contactService.getContactByID(createCompanyWithContactParams.contactID)

    return await this.companyRepository.save(newCompany);
  }

  async deleteCompany(id: string) {
    return await this.companyRepository.delete(id);
  }
}
