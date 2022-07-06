import express from "express";
const router = express.Router();
import passport from "passport";
import "../middleware/isAuth";

const auth = passport.authenticate("jwt", { session: false });

// Call middleware here
import userController from "../controllers/user.controller";

router.get("/", auth, userController.getAllUsers);

router.get("/:id", userController.getSpecificUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.delete("/logout", auth, userController.logoutUser);

export default router;
