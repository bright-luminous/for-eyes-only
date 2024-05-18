import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteParams } from './note.dto';

@Injectable()
export class NoteService {
  constructor(
    @Inject('NOTE_REPOSITORY')
    private noteRepository: Repository<Note>,
  ) {}

  async getNotes(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  async createNotes(createNoteParams: CreateNoteParams): Promise<Note> {
    var newNote = new Note();
    newNote.noteName = createNoteParams.noteName;
    newNote.type = createNoteParams.type;
    newNote.brand = createNoteParams.brand;
    newNote.model = createNoteParams.model;
    newNote.price = createNoteParams.price;
    // newNote.company.name = createNoteParams.companyName;
    newNote.notification = createNoteParams.notification;
    newNote.notificationPeriod = createNoteParams.notificationPeriod;
    newNote.note = createNoteParams.note

    return await this.noteRepository.save(newNote);
  }

  async deleteNotes(id: string) {
    return await this.noteRepository.delete(id);
  }
}
