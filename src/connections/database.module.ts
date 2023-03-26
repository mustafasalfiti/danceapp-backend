import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get(
          'MONGO_USERNAME'
        )}:${configService.get('MONGO_PASSWORD')}@${configService.get(
          'MONGO_HOST'
        )}:${configService.get('MONGO_PORT')}/${configService.get(
          'MONGO_DATABASE'
        )}?authSource=${configService.get('MONGO_AUTH_DB')}`,
        retryAttempts: 1,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
