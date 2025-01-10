import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @ApiOperation({
    summary: 'Ping API',
    description: 'Endpoint used to check if the API is up and running.',
  })
  ping() {
    return this.appService.ping();
  }
}
