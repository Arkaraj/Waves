import express from "express";
const router = express.Router();
import passport from "passport";
import uploadController from "../controllers/upload.controller";
import "../middleware/isAuth";

const auth = passport.authenticate("jwt", { session: false });

router.get("/:id", auth, uploadController.getImage);

export default router;
