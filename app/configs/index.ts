const dotenv = require("dotenv");
// config() will read your .env file, parse the contents, assign it to process.env
dotenv.config();

export default {
  port: process.env.PORT,
  environment: process.env.NODE_ENV || "development",
  originUrl: process.env.ORIGIN_URL || "",
  s3: {
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: process.env.S3_REGION,
    bucketName: process.env.S3_BUCKET_NAME,
  },
  fileValidations: {
    allowedFileSizeInKB: process.env.MAX_UPLOAD_FILE_SIZE_KB,
    allowedFileMimeTypes: process.env.ALLOWED_FILE_MIME_TYPES,
  },
};
