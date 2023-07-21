import express from "express";
import { login, signUp } from "../controllers/user.js";
import passport from "passport";
import { googleAuthCallback } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
router.get("/auth/google/callback", passport.authenticate("google", { session: false }), googleAuthCallback);

export default router;

// const a = "yes";
// export default a;
