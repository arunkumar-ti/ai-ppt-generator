import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PptGeneratorModule } from './ppt-generator/ppt-generator.module';
import { MistralModule } from './mistral/mistral.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PptGeneratorModule,
    MistralModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
