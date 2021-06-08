import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('systemInfo')
  async getMac(@Query() query: any) {
    const data = await this.appService.runProcess({ query });
    return data;
  }
}
