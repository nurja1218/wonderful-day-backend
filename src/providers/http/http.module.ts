import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { HttpModule as _HttpModule } from '@nestjs/axios';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    _HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
