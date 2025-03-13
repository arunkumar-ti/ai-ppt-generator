import { Test, TestingModule } from '@nestjs/testing';
import { PptGeneratorService } from './ppt-generator.service';

describe('PptGeneratorService', () => {
  let service: PptGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PptGeneratorService],
    }).compile();

    service = module.get<PptGeneratorService>(PptGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
