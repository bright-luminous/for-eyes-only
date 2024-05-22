import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { AddMaintenanceParams, CreateNoteParams } from './note.dto';
import { MaintenanceRec } from 'src/maintenanceRec/maintenanceRec.entity';
import { MaintenanceRecService } from 'src/maintenanceRec/maintenanceRec.service';

@Injectable()
export class NoteService {
  constructor(
    @Inject('NOTE_REPOSITORY')
    private noteRepository: Repository<Note>,
  ) {}

  async getNotes(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  async getNoteByID(id: string): Promise<Note> {
    return await this.noteRepository.findOne({where:{id:id}},);
  }

  async getNoteWithMaintenance(): Promise<Note[]> {
    const returnNotes = await this
    .noteRepository
    .createQueryBuilder("note")
    .leftJoinAndSelect("note.maintenanceRec", "maintenanceRec")
    .getMany()

    return returnNotes;
  }

  async createNote(createNoteParams: CreateNoteParams): Promise<Note> {
    var newNote = new Note();
    newNote.noteName = createNoteParams.noteName;
    newNote.type = createNoteParams.type;
    newNote.brand = createNoteParams.brand;
    newNote.model = createNoteParams.model;
    newNote.price = createNoteParams.price;
    // newNote.company.name = createNoteParams.companyName;
    newNote.maintenanceRec = [];
    newNote.notification = createNoteParams.notification;
    newNote.notificationPeriod = createNoteParams.notificationPeriod;
    newNote.note = createNoteParams.note

    return await this.noteRepository.save(newNote);
  }

  async deleteNote(id: string) {
    return await this.noteRepository.delete(id);
  }
}
