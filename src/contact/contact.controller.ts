import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactParams } from './contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get()
  getJobs() {
    return this.contactService.getContacts();
  }

  @Get('byID')
  getContactByID(@Query('id') id: string) {
    return this.contactService.getContactByID(id);
  }

  @Post()
  async createNote(@Body() createContactParams: CreateContactParams){
    return this.contactService.createContact(createContactParams);
  }

  @Delete()
  async deleteNote(@Query('id') id: string){
    return this.contactService.deleteContact(id);
  }
}
