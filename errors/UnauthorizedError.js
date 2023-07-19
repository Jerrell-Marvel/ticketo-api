import { StatusCodes } from "http-status-codes";

export class UnauthorizedError extends Error {
  name = "UnathorizedError";
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
