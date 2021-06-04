import { Injectable } from '@nestjs/common';
import * as si from 'systeminformation';

@Injectable()
export class AppService {
  async runProcess() {
    const data = await si.diskLayout();
    return data;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
