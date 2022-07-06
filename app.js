import express from "express";
import mongoose from "mongoose";
const logger = require("morgan");
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index";
import dotenv from "dotenv";
import { config } from "./config";

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const app = express();

const mongoConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

// mongoose
//   .connect(config.MONGO_URI, mongoConnectionOptions)
//   .then((conn) => {
//     // mongoose.set("debug", true);
//     console.log("Successfully connected to db");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Waves API successfully loaded");
});

app.use("/api/v1", indexRouter);

const port = config.PORT || "8080";

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
