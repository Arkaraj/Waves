import express from "express";
import { customErrorHandler } from "../helper/ErrorHandler";
const router = express.Router();

// router.use("/auth");
// router.use("/users");

router.all("*", function (req, res) {
  return customErrorHandler(res, 404, "Page not found");
});

export default router;
