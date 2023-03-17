import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokensDb } from './provider/tokensDb';
import { EthProvider } from './provider/ethProvider';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TokensDb, EthProvider],
})
export class AppModule {}
