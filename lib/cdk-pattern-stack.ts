import { Stack, StackProps } from 'aws-cdk-lib';
import * as core from 'aws-cdk-lib/aws-core';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as cf from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

// Main Stack
export class CdkPatternStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // create s3 bucket
    const bucket = new s3.Bucket(this, 'BucketHoldingReactApp', {
      publicReadAcess: true,
      removalPolicy: core.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html' 
    });

    // deployment
    const deployment = new deployment.BucketDeployment(this, 'DeployReact', {
      sources: [deployment.Source.asset('./build')],
      destinationBucket: bucket
    });

    // cloudfront
    const cf = new cf.CloundFrontWebDistribution(this, 'CloudFrontDist', {
      originConfigs: [{
        s3OriginSource: {
	  s3BucketSource: bucket
	},
	behaviors: [{
	  isDefaultBehavior: true
	}]
      }]
    }); 

  }
}
