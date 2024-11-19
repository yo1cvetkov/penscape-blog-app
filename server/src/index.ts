import mongoose from "mongoose";
import app from "./server";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB failed to connect", error);
    process.exit(1);
  }
};

connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
