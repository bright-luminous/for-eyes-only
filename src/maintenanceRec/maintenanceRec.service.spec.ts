import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceRecService } from './maintenanceRec.service';

describe('ContactService', () => {
  let service: MaintenanceRecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceRecService],
    }).compile();

    service = module.get<MaintenanceRecService>(MaintenanceRecService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
