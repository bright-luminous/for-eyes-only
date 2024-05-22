import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { AddMaintenanceParams, CreateNoteParams } from './note.dto';

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

  @Post()
  async createNote(@Body() createNoteParams: CreateNoteParams){
    return this.noteService.createNote(createNoteParams);
  }

  @Delete()
  async deleteNote(@Query('id') id: string){
    return this.noteService.deleteNote(id);
  }
}
