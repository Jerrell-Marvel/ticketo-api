import express from "express";
import passport from "passport";
import { googleAuthCallback } from "../controllers/user.js";

const router = express.Router();

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
router.get("/auth/google/callback", passport.authenticate("google", { session: false }), googleAuthCallback);

export default router;
