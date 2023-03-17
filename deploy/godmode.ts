import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import { ServicePrincipal, PolicyStatement, Policy } from '@aws-cdk/aws-iam';
import { Duration } from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';
export class GodMode extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'classifier', {
      tableName: 'classifier',
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
    });

    const isGodMode = new lambda.Function(this, 'isGodMode', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'src/handler.handler',
      code: lambda.Code.fromAsset('./dist/lambda.zip'),
      memorySize: 512,
      description: `Generated on: ${new Date().toISOString()}`,
      timeout: Duration.seconds(60),
      environment: {
        EthMainnetApiKey: process.env.EthMainnetApiKey,
        EthGoerliApiKey: process.env.EthGoerliApiKey,
        PolygonMainnetApiKey: process.env.PolygonMainnetApiKey,
        PolygonMumbaiApiKey: process.env.PolygonMumbaiApiKey,
        ClassifierTableName: table.tableName,
      },
    });
    table.grantReadData(isGodMode as any);
    const policy = new PolicyStatement({
      actions: ['*'],
      resources: ['arn:aws:dynamodb:us-east-1:781619103453:table/*'],
    });

    isGodMode.role?.attachInlinePolicy(
      new Policy(this, 'db read', {
        statements: [policy],
      }),
    );
    const api = new apigateway.RestApi(this, 'MyApi', {
      description: 'My API Gateway',
      restApiName: 'MyAPI',
      defaultCorsPreflightOptions: {
        allowOrigins: ['*'],
        allowMethods: ['GET', 'POST', 'PUT'],
        allowHeaders: ['Content-Type', 'Authorization'],
      },
    });

    isGodMode.addPermission('PermitAPIGInvocation', {
      principal: new ServicePrincipal('apigateway.amazonaws.com'),
      sourceArn: api.arnForExecuteApi('*'),
    });

    const txIntegration = new apigateway.LambdaIntegration(
      isGodMode as any,
      {},
    );
    const apiKey = api.addApiKey('ApiKey');
    const resource = api.root.addResource('{proxy+}');
    const method = resource.addMethod('ANY', txIntegration, {
      requestParameters: {
        'method.request.querystring.address': true,
        'method.request.querystring.network': true,
      },
      apiKeyRequired: true,
    }); // GET /

    const plan = api.addUsagePlan('UsagePlan', {
      name: 'godModeUsagePlan',
      throttle: {
        rateLimit: 10,
        burstLimit: 2,
      },
    });
    plan.addApiStage({
      stage: api.deploymentStage,
      throttle: [
        {
          method: method,
          throttle: {
            rateLimit: 10,
            burstLimit: 2,
          },
        },
      ],
    });
    plan.addApiKey(apiKey);
  }
}
