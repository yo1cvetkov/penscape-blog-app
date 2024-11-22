import { GetObjectCommand, GetObjectCommandInput, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as dotenv from "dotenv";
import { s3 } from "../../shared/utils/s3";
import crypto from "crypto";

dotenv.config();

export class FileService {
  static #instance: FileService;

  private constructor() {}

  public static get instance(): FileService {
    if (!FileService.#instance) {
      FileService.#instance = new FileService();
    }

    return FileService.#instance;
  }

  async uploadFileToS3(file: Express.Multer.File, buffer?: Buffer) {
    const randomImageName = () => crypto.randomBytes(32).toString("hex");

    const name = randomImageName();

    const params: PutObjectCommandInput = {
      Bucket: process.env.BUCKET_NAME!,
      Key: name,
      Body: buffer ? buffer : file.buffer,
      ContentType: file.mimetype,
    };

    const putCommand = new PutObjectCommand(params);

    await s3.send(putCommand);

    return name;
  }

  async generateSignedUrl(name: string) {
    const getObjectParams: GetObjectCommandInput = {
      Bucket: process.env.BUCKET_NAME!,
      Key: name,
    };

    const command = new GetObjectCommand(getObjectParams);

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return url;
  }
}
