import { ForbiddenError } from "../errors/ForbiddenError.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import jwt from "jsonwebtoken";

export const adminAuthMiddleware = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError("token not provided");
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError("invalid token");
  }

  if (payload.role !== "admin") {
    throw new ForbiddenError("you do not have necessary roles to access this resource");
  }

  req.user = {
    username: payload.username,
    userId: payload.userId,
    role: payload.role,
    isGoogleUser: payload.isGoogleUser,
  };
  next();
};
