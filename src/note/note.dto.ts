export class CreateNoteParams {
  noteName: string;
  type: string;
  brand: string;
  model: string;
  price: number;
  companyName: string;
  notification: Date;
  notificationPeriod: number;
  note: string;
}

export class CreateNoteWithDetailParams {
    noteName: string;
    type: string;
    brand: string;
    model: string;
    price: number;
    contactID: string
    companyID: string;
    notification: Date;
    notificationPeriod: number;
    note: string;
  }

export class AddCompanyParams {
    noteID: string;
    companyID: string;
}

export class AddServiceParams {
    noteID: string;
    contactID: string;
}

export class Company {
    name: string;
    contacts: Contacts[];
}

export class Contacts{
    tel: string;
    name: string;
    lineID: string;
}

export class MaintenanceRec{
    job: string;
    engineerName: string;
    date: string;
    price: number;
}