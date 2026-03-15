import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("Mongo_URI is not defined in .env file");
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
};

export default config;
