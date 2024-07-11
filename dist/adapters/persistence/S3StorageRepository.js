"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3StorageRepository = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const env_1 = require("../../config/env");
class S3StorageRepository {
    constructor() {
        const accessKeyId = env_1.env.s3.accessKeyId;
        const secretAccessKey = env_1.env.s3.secretAccessKey;
        const sessionToken = env_1.env.s3.sessionToken;
        const region = env_1.env.s3.region;
        if (!accessKeyId || !secretAccessKey || !region) {
            throw new Error('AWS credentials or region are not defined in .env');
        }
        this.s3 = new aws_sdk_1.default.S3({
            accessKeyId,
            secretAccessKey,
            sessionToken: sessionToken || undefined,
            region,
        });
    }
    upload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const bucketName = env_1.env.s3.bucketName;
            if (!bucketName) {
                throw new Error('AWS S3 bucket name is not defined in .env');
            }
            const params = {
                Bucket: bucketName,
                Key: `${Date.now()}-${file.originalname}`,
                Body: file.buffer,
            };
            const result = yield this.s3.upload(params).promise();
            return result.Location;
        });
    }
    delete(fileKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const bucketName = env_1.env.s3.bucketName;
            if (!bucketName) {
                throw new Error('AWS S3 bucket name is not defined in .env');
            }
            const params = {
                Bucket: bucketName,
                Key: fileKey,
            };
            yield this.s3.deleteObject(params).promise();
        });
    }
}
exports.S3StorageRepository = S3StorageRepository;
