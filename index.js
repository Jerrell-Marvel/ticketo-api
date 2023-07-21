// Express
import express from "express";
const app = express();

// Express async errors
import "express-async-errors";

// Error handler
import { errorHandler } from "./middleware/errorHandler.js";

//Path
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv
import dotenv from "dotenv";
dotenv.config();

// Mongoose
import mongoose from "mongoose";

// Cors
import cors from "cors";

// Model import (Use .js file extension!!!)
import User from "./models/User.js";

import cookieParser from "cookie-parser";

// Routes import
import userRoutes from "./routes/user.js";

//Passport import
import passport from "passport";
import googleStrat from "passport-google-oauth20";
const GoogleStrategy = googleStrat.Strategy;
import { passportCallback } from "./controllers/user.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { fileUpload } from "./middleware/fileUpload.js";

// Cookie parse
app.use(cookieParser());

// Parse json
app.use(express.json());

//Serve static
app.use(express.static("public"));

//Setting up cors
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "127.0.0.1:5500", "192.168.0.182:3000"],
  })
);

// Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    passportCallback
  )
);

// Routes
app.use("/api/v1", userRoutes);

// app.get("/test", authMiddleware);

app.get("/", async (req, res) => {
  // try {
  //   const user = await User.create({ username: Date.now(), email: "j2sad@gmail.com", password: "123" });
  //   return res.json(user);
  // } catch (err) {
  //   return res.json(err);
  // }
  return res.status(200).cookie("s", "dffd", { sameSite: "none", secure: true, httpOnly: true }).json({ success: true });
  throw new BadRequestError("sdkfjlsk");
});

// Testing file upload
app.post("/upload", fileUpload("./public").array("photos", 12), async (req, res) => {
  // console.log(req.headers);
  // console.log(req.files);

  console.log(req.body);
  return res.json("jkdfjkl");
});

//Error handling
app.use(errorHandler);

// Spinning up the server
const PORT = 5000;
app.listen(PORT, async () => {
  console.log("Connecting to mongodb");
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.log("Failed to connect to mongodb");
  }
});
