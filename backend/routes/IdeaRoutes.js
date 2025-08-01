import express from "express";
const router = express.Router();
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "..", "data", "db.json");
import Idea from "../models/Idea.js";
import mongoose from "mongoose";

const getDataFromFile = () => {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading or parsing file:", err);
        return [];
    }
};

/**
 * @route           GET /api/routes
 * @description     GET all ideas
 * @access          Public
 * Reads data from a specified file. If the file does not exist, returns an empty array.
 * If the file exists, attempts to read and parse its contents as JSON.
 * Logs an error and returns an empty array if reading or parsing fails.
 *
 * @returns {Array} Parsed data from the file or an empty array if the file does not exist or an error occurs.
 */
router.get("/", async (req, res, next) => {
    try {
        const ideas = await Idea.find();
        res.json(ideas);
    } catch (error) {
        next(error);
    }
});

/**
 * @route           POST /api/routes
 * @description     Create a new idea
 * @access          Public
 * Validates the request body for required fields (title, description).
 * Adds the new idea to the data file and returns the created idea.
 * Returns an error if validation fails or file write fails.
 *
 * @returns {Object} The newly created idea or an error message.
 */
router.post("/", async (req, res, next) => {
    try {
        const {
            title,
            verified,
            summary,
            description,
            tags,
            difficulty,
            estimatedTime,
            techStack,
            inspirationLink,
            author,
        } = req.body;

        if (!title.trim() || !summary?.trim() || !description?.trim()) {
            return res
                .status(404)
                .json({ error: "Content for idea not filled correctly." });
        }

        const newIdea = new Idea({
            title,
            verified,
            summary,
            description,
            tags:
                typeof tags === "string"
                    ? tags
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean)
                    : [],
            difficulty,
            estimatedTime,
            techStack:
                typeof techStack === "string"
                    ? techStack
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean)
                    : [],
            inspirationLink,
            author: {
                name: author?.name || "Anonymous",
                avatarUrl: author?.avatarUrl || "",
                githubUrl: author?.githubUrl || "",
            },
        });

        const savedIdea = await newIdea.save();
        res.status(201).json(savedIdea);
    } catch (err) {
        next(err);
    }
});

/**
 * @route           GET /api/routes/:id
 * @description     Get a single idea by ID
 * @access          Public
 * Retrieves an idea matching the provided ID from the data file.
 * Returns the idea if found, otherwise returns a not found error.
 *
 * @returns {Object} The idea object or an error message if not found.
 */
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Idea not found." });
    }
    try {
        const idea = await Idea.findById(id);
        if (!idea) {
            return res.status(404).json({ error: "Idea not found." });
        }
        res.json(idea);
    } catch (err) {
        next(err);
    }
});

/**
 * @route           PATCH /api/routes/:id
 * @description     Update an idea by ID
 * @access          Public
 * Updates the fields of an existing idea matching the provided ID.
 * Returns the updated idea or an error if not found or update fails.
 *
 * @returns {Object} The updated idea object or an error message.
 */
router.patch("/:id", (req, res) => {});

/**
 * @route           DELETE /api/routes/:id
 * @description     Delete an idea by ID
 * @access          Public
 * Removes the idea matching the provided ID from the data file.
 * Returns a success message or an error if not found or delete fails.
 *
 * @returns {Object} Success message or an error message.
 */
router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Idea not found." });
    }
    try {
        const idea = await Idea.findByIdAndDelete(id);
        if (!idea) {
            return res.status(404).json({ error: "Idea not found." });
        }
        res.json({ message: "Idea deleted successfully." });
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Idea not found." });
        }
        const {
            title,
            verified,
            summary,
            description,
            tags,
            difficulty,
            estimatedTime,
            techStack,
            inspirationLink,
            author,
        } = req.body;

        const updateIdea = await Idea.findByIdAndUpdate(
            id,
            {
                title,
                verified,
                summary,
                description,
                tags: Array.isArray(tags)
                    ? tags
                    : tags.split(",").map((t) => t.trim()),
                difficulty,
                estimatedTime,
                techStack: Array.isArray(techStack)
                    ? techStack
                    : techStack.split(",").map((t) => t.trim()),
                inspirationLink,
                author: {
                    name: author?.name || "Anonymous",
                    avatarUrl: author?.avatarUrl || "",
                    githubUrl: author?.githubUrl || "",
                },
            },
            { new: true }
        );

        if (!updateIdea) {
            return res.status(404).json({ error: "Idea not found." });
        }
        res.json(updateIdea);
    } catch (err) {
        next(err);
    }
});

export default router;
