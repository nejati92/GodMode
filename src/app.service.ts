import { Injectable } from '@nestjs/common';
import { EthProvider } from './provider/ethProvider';
import { TokensDb } from './provider/tokensDb';
interface GodModeResponse {
  network: string;
  ABI: string;
  token: string;
  classification: string;
  threshold: number;
  balance: string;
}
@Injectable()
export class AppService {
  constructor(private tokensDb: TokensDb, private ethProvider: EthProvider) {}
  async isGodMode(
    walletAddress: string,
    network: string,
  ): Promise<GodModeResponse[]> {
    const response = await this.tokensDb.getTokens(network);
    const results = await Promise.all(
      response.map((item) => {
        return this.checkIGodMode(
          item.address,
          walletAddress,
          item.threshold,
          network,
          item.tokenType,
        );
      }),
    );
    console.log(response);
    return results.filter(Boolean);
  }

  async checkIGodMode(
    tokenContractAddress: string,
    walletAddress: string,
    threshold: number,
    network: string,
    ABI: string,
  ): Promise<GodModeResponse> {
    const balance = await this.ethProvider.getTokenBalance(
      tokenContractAddress,
      walletAddress,
      network,
      ABI,
    );
    if (balance) {
      return {
        network,
        ABI,
        token: tokenContractAddress,
        classification:
          parseInt(balance, 10) > threshold ? 'GodMode' : 'NotGodMode',
        threshold,
        balance,
      };
    }
  }
}
