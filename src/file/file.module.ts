import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Module } from 'nestjs-s3';
import { FileController } from './file.controller';

@Module({
  imports: [
    S3Module.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        config: {
          accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
          secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
          endpoint: configService.get('S3_ENDPOINT'),
          s3ForcePathStyle: true,
          signatureVersion: 'v4',
        },
      }),
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
