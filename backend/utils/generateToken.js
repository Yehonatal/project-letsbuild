import { SignJWT } from "jose";
import JWT_SECRET from "./getJwtSecret.js";

/**
 * Generate a JWT token for a user.
 * @param {Object} payload - Data to embed in the token.
 * @param {string} expiresIn - Token expiration time (e.g., "1h", "2d")
 */

export const generateToken = async (payload, expiresIn = "15m") => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(JWT_SECRET);
};
