#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WebserverStack } from '../lib/web-server-stack';

const app = new cdk.App();
new WebserverStack(app, 'WebserverStack', {
  containerCount: 1
});
