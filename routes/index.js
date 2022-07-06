import express from "express";
import { customErrorHandler } from "../helper/ErrorHandler";
const router = express.Router();

import userRoute from "./user.routes";
import artistRoute from "./artist.routes";

//Routes
router.use("/users", userRoute);
router.use("/artist", artistRoute);

router.all("*", function (req, res) {
  return customErrorHandler(res, 404, "Page not found");
});

export default router;
