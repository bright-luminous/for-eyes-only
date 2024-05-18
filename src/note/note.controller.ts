import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteParams } from './note.dto';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  getJobs() {
    return this.noteService.getNotes();
  }

  @Post()
  async createNote(@Body() createNoteParams: CreateNoteParams){
    return this.noteService.createNotes(createNoteParams);
  }

  @Delete()
  async deleteNote(@Query('id') id: string){
    return this.noteService.deleteNotes(id);
  }
}
