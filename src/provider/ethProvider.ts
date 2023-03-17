import { AlchemyProvider, Contract, formatUnits, formatEther } from 'ethers';
import { erc20Abi, erc721Abi } from './abis';
import { Injectable } from '@nestjs/common';
const networkMap = {
  ['Ethereum Mainnet']: 'mainnet',
  ['Ethereum Goerli']: 'goerli',
  ['Polygon Mainnet']: 'matic',
  ['Polygon Mumbai']: 'matic-mumbai',
};

const apiKeyMap = {
  ['Ethereum Mainnet']: process.env.EthMainnetApiKey,
  ['Ethereum Goerli']: process.env.EthGoerliApiKey,
  ['Polygon Mainnet']: process.env.PolygonMainnetApiKey,
  ['Polygon Mumbai']: process.env.PolygonMumbaiApiKey,
};

const abisMap = {
  ['ERC-20']: erc20Abi,
  ['ERC-721']: erc721Abi
};
@Injectable()
export class EthProvider {
  constructor() {}
  async getTokenBalance(
    tokenContractAddress: string,
    address: string,
    network: string,
    tokenType: string,
  ): Promise<string | undefined> {
    let balanceFormatted: string;
    console.log(tokenContractAddress);
    console.log(address);
    const provider = new AlchemyProvider(
      networkMap[network],
      apiKeyMap[network],
    );
    if (tokenContractAddress === '0x') {
      const balance = await provider.getBalance(address);
      const balanceFormatted = formatEther(balance);
      return balanceFormatted;
    } else {
      const contract = new Contract(
        tokenContractAddress,
        abisMap[tokenType],
        provider,
      );
      const contractName = await contract.name();
      console.log("The token's contract name is " + contractName);
      const balance = await contract.balanceOf(address);
      console.log(balance);
      if (balance && tokenType === "ERC-20") {
        balanceFormatted = formatUnits(balance, 18);
      }
      else if (balance && tokenType === 'ERC-721') {
        balanceFormatted = formatUnits(balance, 0);
      }
    }
    console.log(balanceFormatted);

    return balanceFormatted;
  }
}
