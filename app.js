import express from "express";
import mongoose from "mongoose";
const logger = require("morgan");
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index";
import dotenv from "dotenv";
import { config } from "./config";
import cors from "cors";

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const app = express();

const mongoConnectionOptions = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
};

mongoose
  .connect(config.MONGO_URI, mongoConnectionOptions)
  .then((_conn) => {
    console.log("Successfully connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

if (config.NODE_ENV == "development") {
  app.use(logger("dev"));
  // mongoose.set("debug", true);
}

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Waves API successfully loaded");
});

app.use("/api/v1", indexRouter);

const port = config.PORT || "8000";

if (config.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ msg: "Waves API is Working" });
  });
}

app.listen(port, () => {
  console.log(`Server running at ${port} 🚀`);
});
