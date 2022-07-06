import express from "express";
const router = express.Router();
import passport from "passport";
import "../middleware/isAuth";

const auth = passport.authenticate("jwt", { session: false });

// Call middleware here
import artistController from "../controllers/artist.controller";

router.get("/", auth, artistController.getAllArtists);
router.get("/:id", auth, artistController.getSpecificArtist);
router.post("/create", auth, artistController.createNewArtist);
router.delete("/delete/:id", auth, artistController.deleteArtist);

export default router;
