import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  },

  password: {
    type: String,
  },

  isGoogleUser: {
    type: Boolean,
    required: true,
    default: false,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
});

UserSchema.pre("save", async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
  }

  next();
});

UserSchema.methods.matchPassword = async function (userPassword) {
  const isPasswordMatch = await bcrypt.compare(userPassword, this.password);
  return isPasswordMatch;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign({ username: this.username, userId: this._id, role: this.role, isGoogleUser: this.isGoogleUser }, process.env.JWT_SECRET);
};

const User = model("User", UserSchema);

export default User;
