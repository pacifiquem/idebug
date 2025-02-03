import { Loggable } from '@idebug/nest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  @Loggable()
  getHello(): string {
    return 'Hello World!';
  }
}
