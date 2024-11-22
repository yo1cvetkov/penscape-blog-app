import { S3Client } from "@aws-sdk/client-s3";
import { awsConfig } from "../../config/awsConfig";

export const s3 = new S3Client(awsConfig);
