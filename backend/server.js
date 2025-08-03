import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import IdeaRouter from "./routes/IdeaRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/ideas", IdeaRouter);
app.use("/api/auth", authRouter);

// Health Check Route
app.get("/healthy", (req, res) => {
    res.send("API is running...");
});

// 404 Fall Back
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
