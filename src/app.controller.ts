import { Controller, Get, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GodModeRequestDto } from './dto/godModeRequestDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/isGodMode')
  async getHello(@Query() query: GodModeRequestDto): Promise<any> {
    console.log({ query });
    console.log('hellos');
    return this.appService.getHello(query.address, query.network);
  }
}
