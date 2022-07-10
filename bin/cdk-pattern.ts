#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkPatternStack } from '../lib/cdk-pattern-stack';

const app = new cdk.App();
// react app hosted via cdk
new CdkPatternStack(app, 'CdkPatternStack', {
  env: {
    region: 'us-eas-1'
  }
});
