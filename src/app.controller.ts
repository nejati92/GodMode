import { Controller, Get, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GodModeRequestDto } from './dto/godModeRequestDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/isGodMode')
  async getGodMode(@Query() query: GodModeRequestDto): Promise<any> {
    console.log({ query });
    return this.appService.getGodMode(query.address, query.network);
  }
}
