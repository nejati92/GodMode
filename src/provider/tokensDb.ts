import { DynamoDB } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
@Injectable()
export class TokensDb {
  private client: DynamoDB.DocumentClient;

  constructor() {
    this.client = new DynamoDB.DocumentClient({
      region: 'us-east-1',
      apiVersion: '2012-08-10',
    });
  }

  public async getTokens(network: string): Promise<
    {
      address: string;
      tokenType: string;
      threshold: number;
      network: string;
    }[]
  > {
    console.info('getTokens');
    const queryItem: DynamoDB.DocumentClient.QueryInput = {
      TableName: process.env.ClassifierTableName,
      KeyConditionExpression: 'PK = :network',
      ExpressionAttributeValues: {
        ':network': network,
      },
    };
    const response = await this.client.query(queryItem).promise();
    return response.Items.map((x) => {
      return {
        address: x.SK,
        tokenType: x.tokenType,
        threshold: x.threshold,
        network: x.PK,
      };
    });
  }
}
