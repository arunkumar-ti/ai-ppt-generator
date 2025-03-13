import { Module } from '@nestjs/common';
import { MistralModule } from 'src/mistral/mistral.module';
import { PptGeneratorController } from './ppt-generator.controller';
import { PptGeneratorService } from './ppt-generator.service';

@Module({
  providers: [PptGeneratorService],
  controllers: [PptGeneratorController],
  imports: [MistralModule],
})
export class PptGeneratorModule {}
