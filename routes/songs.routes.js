import express from "express";
const router = express.Router();
import passport from "passport";
import "../middleware/isAuth";

const auth = passport.authenticate("jwt", { session: false });

// Call middleware here
import songController from "../controllers/song.controller";
import { uploadSingleImage } from "../middleware/multer";

router.get("/", auth, songController.getAllSongs);
router.get("/:id", auth, songController.getSpecificSongs);
router.post("/create", auth, songController.createNewSong);
router.post(
  "/image",
  auth,
  uploadSingleImage("image"),
  songController.AddSongCoverImage
);
router.put("/rating/:id", auth, songController.rateASong);
router.delete("/delete/:id", auth, songController.deleteSong);

export default router;
