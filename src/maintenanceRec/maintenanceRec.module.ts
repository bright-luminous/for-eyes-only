import { Module } from '@nestjs/common';
import { maintenanceRecProviders } from './maintenanceRec.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...maintenanceRecProviders]
})
export class MaintenanceRecModule {}
