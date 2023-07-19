import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError("token not provided");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      username: payload.username,
      userId: payload.userId,
      role: payload.role,
      isGoogleUser: payload.isGoogleUser,
    };
    next();
  } catch (err) {
    throw new UnauthorizedError("invalid token");
  }
};
