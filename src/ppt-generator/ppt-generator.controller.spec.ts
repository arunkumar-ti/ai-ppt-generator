import { Test, TestingModule } from '@nestjs/testing';
import { PptGeneratorController } from './ppt-generator.controller';

describe('PptGeneratorController', () => {
  let controller: PptGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PptGeneratorController],
    }).compile();

    controller = module.get<PptGeneratorController>(PptGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
