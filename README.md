## How to Setup

### How the project works

- The code is written in TypeScript.
- It consist the src directory which has the:
  - Lambda code
  - DynamoDb code to retrieve the classification rules
  - Validation code
  - Blockchain Provider
- It also has the deploy directory
  - This has the AWS infrastructure code using the CDK which will deploy the Graphql,DynamoDb and the 3 lambdas to AWS code.

### How to run it

#### Export the following ENV vars:

- `export REGION="YOUR_AWS_REGION"`;
- `export ACCOUNT_ID="YOUR_AWS_ACCOUNT_ID"`;
- `export EthMainnetApiKey="ALCHEMY_API_KEY_FOR_ETH_MAINNET"`;
- `export EthGoerliApiKey="ALCHEMY_API_KEY_FOR_ETH_GOERLI"`;
- `export PolygonMainnetApiKey="ALCHEMY_API_KEY_FOR_POLYGON"`;
- `export PolygonMumbaiApiKey="ALCHEMY_API_KEY_FOR_POLYGON_MUMBAI"`;

#### Run the following commands

- `npm install`
- `npm run build && npm run deploy
#### Add Classification Rules:
- You will need to head to AWS console and add the classification rules manually.

#### Note:
- This assumes you have aws cli setup and your credentials are set.

Example Requests:
```
curl -X GET \
 'https://gv2yclaxu8.execute-api.us-east-1.amazonaws.com/prod/isGodMode?address=0xE73Af8e443bE927f4D53c306F1d12eE13ae1dBFA&network=Polygon%20Mainnet' \
 -H 'cache-control: no-cache' \
 -H 'x-api-key: REQUEST_API_KEY'
```
```
curl -X GET \
 'https://gv2yclaxu8.execute-api.us-east-1.amazonaws.com/prod/isGodMode?address=0x57ec4f7cf36f96cb0bdd8914ac57b9683693b0c0&network=Ethereum%20Mainnet' \
 -H 'cache-control: no-cache' \
 -H 'x-api-key: REQUEST_API_KEY'
```