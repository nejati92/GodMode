#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { GodMode } from '../deploy/godmode';
const app = new cdk.App();
new GodMode(app, 'GodMode', {
  env: {
    region: process.env.REGION,
    account: process.env.ACCOUNT_ID,
  },
});
