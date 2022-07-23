import dotenv from "dotenv";
dotenv.config();

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  SECRET: process.env.SECRET,
  PORT: process.env.PORT,
  BCRYPT_SALTROUNDS: process.env.BCRYPT_SALTROUNDS,
  ITEMS_PER_PAGE: process.env.ITEMS_PER_PAGE,
  CLOUDNINARY_CLOUD_NAME: process.env.CLOUDNINARY_CLOUD_NAME,
  CLOUDNINARY_API_KEY: process.env.CLOUDNINARY_API_KEY,
  CLOUDNINARY_API_SECRET: process.env.CLOUDNINARY_API_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};
