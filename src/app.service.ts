import { Injectable } from '@nestjs/common';
import * as si from 'systeminformation';

@Injectable()
export class AppService {
  async runProcess() {
    const data = await si.currentLoad();
    return data;
  }
}
