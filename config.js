import dotenv from "dotenv";
dotenv.config();

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  SECRET: process.env.SECRET,
  PORT: process.env.PORT,
  BCRYPT_SALTROUNDS: process.env.BCRYPT_SALTROUNDS,
  ITEMS_PER_PAGE: process.env.ITEMS_PER_PAGE,
  NODE_ENV: process.env.NODE_ENV,
};
