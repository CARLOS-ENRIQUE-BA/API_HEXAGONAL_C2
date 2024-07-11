import AWS from 'aws-sdk';
import { env } from '../../config/env';
import { IStorageRepository } from '../../domain/IStorageRepository';

export class S3StorageRepository implements IStorageRepository {
    private s3: AWS.S3;

    constructor() {
        const accessKeyId = env.s3.accessKeyId;
        const secretAccessKey = env.s3.secretAccessKey;
        const sessionToken = env.s3.sessionToken;
        const region = env.s3.region;

        if (!accessKeyId || !secretAccessKey || !region) {
            throw new Error('AWS credentials or region are not defined in .env');
        }

        this.s3 = new AWS.S3({
            accessKeyId,
            secretAccessKey,
            sessionToken: sessionToken || undefined,
            region,
        });
    }

    async upload(file: Express.Multer.File): Promise<string> {
        const bucketName = env.s3.bucketName;

        if (!bucketName) {
            throw new Error('AWS S3 bucket name is not defined in .env');
        }

        const params = {
            Bucket: bucketName,
            Key: `${Date.now()}-${file.originalname}`,
            Body: file.buffer,
        };

        const result = await this.s3.upload(params).promise();
        return result.Location;
    }

    async delete(fileKey: string): Promise<void> {
        const bucketName = env.s3.bucketName;

        if (!bucketName) {
            throw new Error('AWS S3 bucket name is not defined in .env');
        }

        const params = {
            Bucket: bucketName,
            Key: fileKey,
        };

        await this.s3.deleteObject(params).promise();
    }
}
