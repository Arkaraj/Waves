import express from "express";
import { customErrorHandler } from "../helper/ErrorHandler";
const router = express.Router();

import userRoute from "./user.routes";

//Routes
router.use("/users", userRoute);

router.all("*", function (req, res) {
  return customErrorHandler(res, 404, "Page not found");
});

export default router;
