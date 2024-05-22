import { DataSource } from 'typeorm';
import { MaintenanceRec } from './maintenanceRec.entity';

export const maintenanceRecProviders = [
  {
    provide: 'MAINTENANCEREC_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(MaintenanceRec),
    inject: ['DATA_SOURCE'],
  },
];