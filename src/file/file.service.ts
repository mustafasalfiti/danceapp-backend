import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectS3, S3 } from 'nestjs-s3';
import { Body } from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    private readonly configService: ConfigService,
    @InjectS3() private readonly s3: S3,
  ) {
    this.s3
      .listBuckets()
      .promise()
      .then(async (res) => {
        const found = res.Buckets.find(
          (bucket) =>
            bucket.Name === this.configService.get<string>('S3_BUCKET'),
        );
        if (!found) {
          await this.s3
            .createBucket({
              Bucket: this.configService.get<string>('S3_BUCKET'),
            })
            .promise();
        }
      });
  }

  getUrl(id: string, expires = 60) {
    try {
      return this.s3.getSignedUrl('getObject', {
        Bucket: this.configService.get<string>('S3_BUCKET'),
        Key: id,
        Expires: expires,
      });
    } catch (e) {
      console.log(e);
      throw new NotFoundException('requested file not found');
    }
  }

  /**
   * Get a stream of the file for download
   * @param id
   * @param bucket
   * @returns
   */
  getStream(id: string, bucket?: string) {
    return this.s3
      .getObject({
        Bucket: bucket ?? this.configService.get<string>('S3_BUCKET'),
        Key: id,
      })
      .createReadStream();
  }

  /**
   * Get the file from the s3 storage
   * @param file
   * @param bucket
   * @returns
   */
  async getFile(file: string, bucket?: string) {
    try {
      return await this.s3
        .getObject({
          Bucket: bucket ?? this.configService.get<string>('S3_BUCKET'),
          Key: file,
        })
        .promise();
    } catch (err) {
      console.log('something went wrong deleting an object', err);
    }
  }

  async storeBuffer(
    value: Body,
    type: string,
    bucket?: string,
    contentType?: string,
    filename = '',
  ) {
    try {
      return await this.s3
        .upload({
          Bucket: bucket ?? this.configService.get<string>('S3_BUCKET'),
          Key: filename ? filename : `${type}-${uuid()}`,
          Body: value,
          ContentType: contentType,
        })
        .promise();
    } catch (err) {
      console.log('something went wrong deleting an object', err);
    }
  }

  // in multer types
  upload(
    file: Express.Multer.File,
    filename: string,
    bucket?: string,
  ): Promise<string> {
    return this.s3
      .upload({
        Bucket: bucket ?? this.configService.get<string>('S3_BUCKET'),
        Key: `${filename}-${uuid()}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentLength: file.size,
      })
      .promise()
      .then((res) => res.Key);
  }

  remove(file: string, bucket?: string) {
    try {
      return this.s3
        .deleteObject({
          Bucket: bucket ?? this.configService.get<string>('S3_BUCKET'),
          Key: file,
        })
        .promise();
    } catch (err) {
      console.log('something went wrong deleting an object', err);
    }
  }
}
