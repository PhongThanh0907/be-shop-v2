import JWT from "jsonwebtoken";

import { TOKEN_SECRET } from "../utils/config.js";

export function generateToken(user) {
  return JWT.sign(user, TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

export function verifyToken(token) {
  try {
    return JWT.verify(token, TOKEN_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
}
