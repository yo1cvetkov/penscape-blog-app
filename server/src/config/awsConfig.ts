import { S3ClientConfig } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";

dotenv.config();

export const awsConfig: S3ClientConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
};
