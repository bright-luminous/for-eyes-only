import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { AddCompanyParams, AddServiceParams, CreateNoteParams, CreateNoteWithDetailParams } from './note.dto';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  getNote() {
    return this.noteService.getNotes();
  }

  @Get('rec')
  getNoteWithRec() {
    return this.noteService.getNoteWithMaintenance();
  }

  @Get('company')
  getNoteWithCompany() {
    return this.noteService.getNoteWithCompany();
  }

  @Get('service')
  getNoteWithService() {
    return this.noteService.getNoteWithService();
  }

  @Get('full')
  getNoteFullDetail() {
    return this.noteService.getNoteFullDetail();
  }

  @Get('fullByID')
  getNoteFullDetailByID(@Query('id') id: string) {
    return this.noteService.getNoteFullDetailByID(id);
  }

  @Post()
  async createNote(@Body() createNoteParams: CreateNoteParams){
    return this.noteService.createNote(createNoteParams);
  }

  @Post('detail')
  async createNoteWithDetail(@Body() createNoteParams: CreateNoteWithDetailParams){
    return this.noteService.createNoteWithDetail(createNoteParams);
  }

  @Put('company')
  async updateCompanyNote(@Body() addCompanyParams: AddCompanyParams){
    return this.noteService.updateCompanyNote(addCompanyParams);
  }

  @Put('service')
  async updateServiceNote(@Body() addServiceParams: AddServiceParams){
    return this.noteService.updateServiceNote(addServiceParams);
  }

  @Delete()
  async deleteNote(@Query('id') id: string){
    return this.noteService.deleteNote(id);
  }

  @Get('noti')
  checkTodayNotification() {
    return this.noteService.dailyNotification();
  }
}
