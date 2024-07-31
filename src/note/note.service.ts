import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import {
  AddCompanyParams,
  AddServiceParams,
  CreateNoteParams,
  CreateNoteWithDetailParams,
} from './note.dto';
import { CompanyService } from 'src/company/company.service';
import { ContactService } from 'src/contact/contact.service';
import axios from 'axios';
import * as qs from 'qs';

@Injectable()
export class NoteService {
  constructor(
    @Inject('NOTE_REPOSITORY')
    private noteRepository: Repository<Note>,
    private readonly companyService: CompanyService,
    private readonly contactService: ContactService,
  ) {}

  async getNotes(): Promise<Note[]> {
    return this.noteRepository.find({
      order: {
        createAt: 'DESC',
      },
    });
  }

  async getNoteByID(id: string): Promise<Note> {
    return await this.noteRepository.findOne({ where: { id: id } });
  }

  async getNoteWithMaintenance(): Promise<Note[]> {
    const returnNotes = await this.noteRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.maintenanceRec', 'maintenanceRec')
      .getMany();

    return returnNotes;
  }

  async getNoteWithCompany(): Promise<Note[]> {
    const returnNotes = await this.noteRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.company', 'company')
      .getMany();

    return returnNotes;
  }

  async getNoteWithService(): Promise<Note[]> {
    const returnNotes = await this.noteRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.service', 'service')
      .getMany();

    return returnNotes;
  }

  async getNoteFullDetail(): Promise<Note[]> {
    const returnNotes = await this.noteRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.maintenanceRec', 'maintenanceRec')
      .leftJoinAndSelect('note.company', 'company')
      .leftJoinAndSelect('note.service', 'service')
      .getMany();

    return returnNotes;
  }

  async getNoteFullDetailByID(id: string): Promise<Note[]> {
    const returnNotes = await this.noteRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.maintenanceRec', 'maintenanceRec')
      .leftJoinAndSelect('note.company', 'company')
      .leftJoinAndSelect('note.service', 'service')
      .where("note.id = :id", {id: id})
      .getMany();

    return returnNotes;
  }

  async createNote(createNoteParams: CreateNoteParams): Promise<Note> {
    var newNote = new Note();
    newNote.noteName = createNoteParams.noteName;
    newNote.type = createNoteParams.type;
    newNote.brand = createNoteParams.brand;
    newNote.model = createNoteParams.model;
    newNote.price = createNoteParams.price;
    newNote.maintenanceRec = [];
    newNote.notification = createNoteParams.notification;
    newNote.notificationPeriod = createNoteParams.notificationPeriod;
    newNote.note = createNoteParams.note;

    return await this.noteRepository.save(newNote);
  }

  async createNoteWithDetail(createNoteParams: CreateNoteWithDetailParams): Promise<Note> {
    var newNote = new Note();
    newNote.noteName = createNoteParams.noteName;
    newNote.type = createNoteParams.type;
    newNote.brand = createNoteParams.brand;
    newNote.model = createNoteParams.model;
    newNote.price = createNoteParams.price;
    newNote.maintenanceRec = [];
    newNote.service = await this.contactService.getContactByID(createNoteParams.contactID)
    newNote.company = await this.companyService.getCompanyByID(createNoteParams.companyID)
    newNote.notification = createNoteParams.notification;
    newNote.notificationPeriod = createNoteParams.notificationPeriod;
    newNote.note = createNoteParams.note;

    return await this.noteRepository.save(newNote);
  }

  async updateCompanyNote(addCompanyParams: AddCompanyParams) {
    var designateNote = await this.getNoteByID(addCompanyParams.noteID);
    var designateCompany = await this.companyService.getCompanyByID(
      addCompanyParams.companyID,
    );
    designateNote.company = designateCompany;

    return await this.noteRepository.save(designateNote);
  }

  async updateServiceNote(addServiceParams: AddServiceParams) {
    var designateNote = await this.getNoteByID(addServiceParams.noteID);
    var designateContact = await this.contactService.getContactByID(
      addServiceParams.contactID,
    );
    designateNote.service = designateContact;

    return await this.noteRepository.save(designateNote);
  }

  async deleteNote(id: string) {
    return await this.noteRepository.delete(id);
  }

  async dailyNotification() {
    var todayDate = new Date();
    // todayDate.setHours(todayDate.getHours() + 7);
    var notesArr = await this.getNoteFullDetail();
    notesArr.forEach((note) => this.checkDate(todayDate, note));
    // this.getToken()
  }

  async checkDate(todayDate: Date, currentNote: Note) {
    // var token = 'P4oVcDObxUF7dNSS81dvb4Sv5tDFSYiIhwnU4HG0kco'; // test one to one
    var token = 'At1iCRbPrkf9bdyyzzoYwlQPJkddVMgDPTrc8sdauzU'; //test group
    const url_line_notification = 'https://notify-api.line.me/api/notify';

    if (
      currentNote.notification.getDate() == todayDate.getDate() &&
      currentNote.notification.getMonth() == todayDate.getMonth() &&
      currentNote.notification.getFullYear() == todayDate.getFullYear()
    ) {
      var newMessage =
        currentNote.noteName +
        '\nDetail : ' +
        currentNote.note +
        '\nContact : ';
      if (Object.is(currentNote.service, null)) {
        newMessage =
          newMessage + `\n - lineID: no contact info\n - Tel: no contact info`;
      } else {
        newMessage =
          newMessage +
          `\n - lineID: ${currentNote.service.lineID}\n - Tel: ${currentNote.service.tel}`;
      }

      const response = await axios.post(
        url_line_notification,
        qs.stringify({
          message: newMessage,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + token,
          },
        },
      );
    }
  }

  async getToken() {
    // const code = 'Hb3YRj9t5rrGztyQMSxR7c';
    const code = 'bBPISeM3rQYrRtPEpBqrAv';
    const url_line_token = 'https://notify-bot.line.me/oauth/token';
    const response = await axios.post(
      url_line_token,
      qs.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:3000/callback',
        client_id: '8fqc655b8FXo0TpOdZOttn',
        client_secret: 'Ng4nL0fdUsjgw9ODtNjkD6NvDEnvm0NAER25CCaTAuR',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    console.log(response);
    return response;
  }
}
