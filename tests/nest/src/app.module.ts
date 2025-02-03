import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDebugConfig } from './config/idebug.config';
import { IDebugModule } from '@idebug/nest';

@Module({
  imports: [IDebugModule.register(AppDebugConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
