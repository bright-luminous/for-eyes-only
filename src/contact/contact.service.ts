import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactParams } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @Inject('CONTACT_REPOSITORY')
    private contactRepository: Repository<Contact>,
  ) {}

  async getCompanies(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async createCompany(createContactParams: CreateContactParams): Promise<Contact> {
    var newContact = new Contact();
    newContact.tel = createContactParams.tel;
    newContact.name = createContactParams.name;
    newContact.lineID = createContactParams.lineID;

    return await this.contactRepository.save(newContact);
  }

  async deleteCompany(id: string) {
    return await this.contactRepository.delete(id);
  }
}
