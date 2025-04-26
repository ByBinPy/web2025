import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'S3_CLIENT',
      useFactory: (config: ConfigService) => new S3({
        endpoint: config.get('S3_ENDPOINT'),
        accessKeyId: config.get('S3_ACCESS_KEY'),
        secretAccessKey: config.get('S3_SECRET_KEY'),
        region: config.get('S3_REGION'),
      }),
      inject: [ConfigService],
    },
  ],
  exports: ['S3_CLIENT'],
})
export class S3Module {}