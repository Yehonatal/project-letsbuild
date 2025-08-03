import { jwtVerify } from "jose";
import dotenv from "dotenv";
import User from "../models/User.js";
import JWT_SECRET from "../utils/getJwtSecret.js";

dotenv.config();

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Get token from header

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            // Check if token is present and starts with "Bearer "
            return res.status(401).join({ error: "Not authorized, No token" });
        }

        const token = authHeader.split(" ")[1]; // Extract the token from the header
        const { payload } = await jwtVerify(token, JWT_SECRET); // Verify the token and get the payload

        const user = await User.findById(payload.userId).select(
            // Find user by ID
            "_id name email"
        );

        if (!user) {
            return res.status(401).join({ error: "User not found" });
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401);
        next(new Error("Not authorized, token failed."));
    }
};
