import express from "express";
const router = express.Router();

router.all("*", function (req, res) {
  return res.status(200).json("Working!");
});

export default router;
