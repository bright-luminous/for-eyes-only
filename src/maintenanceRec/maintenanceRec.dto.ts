export class CreateMaintenanceRecParams{
    job: string;
    engineerName: string;
    date: Date;
    price: number;
    noteID: string;
}

export class AddNoteParams{
    maintenanceID: string;
    noteID: string;
}