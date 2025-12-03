import express from "express";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

import { jwtVerify } from "jose";
import JWT_SECRET from "../utils/getJwtSecret.js";

const router = express.Router();

/**
 * @route           POST /api/auth/register
 * @description     Register a new user
 * @access          Public
 * Validates the request body for required fields (name, email, password).
 * Creates a new user and returns the created user object.
 * Returns an error if validation fails or user creation fails.
 */
router.post("/register", async (req, res, next) => {
    try {
        const { name, email, password } = req.body || {};

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists." });
        }

        const newUser = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password.trim(),
        });

        // Create Tokens
        const payload = { userId: newUser._id.toString() };
        const accessToken = await generateToken(payload, "1m");
        const refreshToken = await generateToken(payload, "30d");

        // Set refresh token in cookies
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        res.status(201).json({
            message: "User registered successfully.",
            accessToken,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Error registering user:", error);
        next(error);
    }
});

/**
 * @route           GET /api/auth/login
 * @description     Login a user
 * @access          Public
 * Validates the request body for required fields (email, password).
 * Authenticates the user and returns a success message.
 * Returns an error if validation fails or authentication fails.
 */
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Email and password are required." });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res
                .status(401)
                .json({ error: "Invalid email or password." });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ error: "Invalid email or password." });
        }

        // Create Tokens
        const payload = { userId: user._id.toString() };
        const accessToken = await generateToken(payload, "1m");
        const refreshToken = await generateToken(payload, "30d");

        // Set refresh token in cookies
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        res.status(200).json({
            message: "Login successful.",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        next(error);
    }
});

/**
 * @route           POST /api/auth/logout
 * @description     Logout user and clear session
 * @access          Private
 * Logs out the user by clearing the session or token.
 * Returns a success message.
 */
router.post("/logout", (req, res) => {
    // Logic to clear session or token goes here
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    });
    res.status(200).json({ message: "Logged out successfully." });
});

/**
 * @route           POST /api/auth/refresh
 * @description     Generate new access token using refresh token
 * @access          Public
 * Validates the refresh token and generates a new access token.
 */
router.post("/refresh", async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        console.log("Refreshing the token...");
        if (!refreshToken) {
            return res
                .status(401)
                .json({ error: "No refresh token provided." });
        }

        // Verify the refresh token
        const { payload } = await jwtVerify(refreshToken, JWT_SECRET);

        // If payload is null or undefined, the token is invalid
        if (!payload) {
            return res.status(401).json({ error: "Invalid refresh token." });
        }

        const user = await User.findById(payload.userId);
        if (!user) {
            return res.status(401).json({ error: "User not found." });
        }

        // Generate a new access token
        const newAccessToken = await generateToken(
            { userId: user._id.toString() },
            "1m"
        );

        res.status(200).json({
            accessToken: newAccessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(401).json({ error: "Invalid refresh token." });
        next(error);
    }
});

export default router;
