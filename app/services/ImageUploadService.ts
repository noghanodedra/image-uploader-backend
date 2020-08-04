import { Service } from "typedi";
import { ImageDetails } from "models/ImageDetails";
import { getConnection } from "typeorm";
import * as AWS from "aws-sdk";

import * as envConfig from "config";
import { ValidationError } from "helpers/ValidationError";
import {
  INVALID_FILE_SIZE,
  INVALID_FILE_TYPE,
} from "helpers/ValidationMessages";

const AWS_S3_BUCKET_NAME = envConfig.default.s3.bucketName || "";
AWS.config.update({
  accessKeyId: envConfig.default.s3.accessKeyId,
  secretAccessKey: envConfig.default.s3.secretAccessKey,
});

const DEFAULT_MAX_UPLOAD_FILE_SIZE_KB = 500;

@Service()
export class ImageUploadService {
  public async create(
    imageDetails: ImageDetails,
    file: File
  ): Promise<string> {
    await this.fileValidations(file);
    return await this.saveAndUpload(imageDetails, file);
  }

  private async fileValidations(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const allowedMimes =
        envConfig.default.fileValidations.allowedFileMimeTypes?.split(",") || [];
      if (!allowedMimes.indexOf(file["mimetype"])) {
        reject(new ValidationError(INVALID_FILE_TYPE));
      }
      const allowedFileSize =
        envConfig.default.fileValidations.allowedFileSizeInKB|| DEFAULT_MAX_UPLOAD_FILE_SIZE_KB;
      const actulaFileSize = file.size / 1000;
      if (Number(allowedFileSize) < Number(actulaFileSize)) {
        reject(new ValidationError(INVALID_FILE_SIZE));
      }
      resolve();
    });
  }

  private async saveAndUpload(
    imageDetails: ImageDetails,
    file: File
  ): Promise<string> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const imd: ImageDetails = new ImageDetails();
      Object.assign(imd, imageDetails);
      await queryRunner.manager.save(imd);
      const location = await this.uploadToS3(file);
      await queryRunner.commitTransaction();
      return location;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  private uploadToS3(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const s3 = new AWS.S3();
      const fileContent = file["data"];
      const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: file.name,
        Body: fileContent,
      };
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  }
}
