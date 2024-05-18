import { DataSource } from 'typeorm';
import { Note } from './note.entity';

export const noteProviders = [
  {
    provide: 'NOTE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Note),
    inject: ['DATA_SOURCE'],
  },
];