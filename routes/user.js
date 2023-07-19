import express from "express";
import { login, signUp } from "../controllers/user.js";
import passport from "passport";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);

export default router;

// const a = "yes";
// export default a;
