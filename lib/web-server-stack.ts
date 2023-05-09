import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';

interface WebserverStackProps extends StackProps {
  /**
   * container image tag
   * @default latest
   */
  readonly imageTag?: string;
  /**
   * number of containers
   */
  readonly containerCount: number;
}

export class WebserverStack extends Stack {
  constructor(scope: Construct, id: string, props: WebserverStackProps) {
    super(scope, id, props);

    // run a nginx web server on Fargate. It has a load balancer in front of it
    new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      memoryLimitMiB: 512,
      cpu: 256,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry(
          `nginx:${props.imageTag ?? 'latest'}`
        )
      },
      desiredCount: props.containerCount,
    });
  }
}
