import express from "express";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import Idea from "../models/Idea.js";
import mongoose from "mongoose";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "..", "data", "db.json");

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
 * @query          _limit (optional limit for ideas returned)
 * Reads data from a specified file. If the file does not exist, returns an empty array.
 * If the file exists, attempts to read and parse its contents as JSON.
 * Logs an error and returns an empty array if reading or parsing fails.
 *
 * @returns {Array} Parsed data from the file or an empty array if the file does not exist or an error occurs.
 */
router.get("/", async (req, res, next) => {
    try {
        const limit = parseInt(req.query._limit);
        const query = Idea.find().sort({ createdAt: -1 });

        if (!isNaN(limit)) {
            query.limit(limit);
        }
        const ideas = await query.exec();
        res.json(ideas);
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/ideas/mine
 * @desc    Get top 2 ideas of the logged-in user by custom score
 * @access  Private (requires auth)
 */
router.get("/mine", protect, async (req, res, next) => {
    try {
        const pipeline = [
            { $match: { user: req.user._id } },

            {
                $addFields: {
                    estMatch: {
                        $regexFind: {
                            input: "$estimatedTime",
                            regex: "\\d+",
                        },
                    },
                },
            },

            {
                $addFields: {
                    estimatedNumber: {
                        $toInt: "$estMatch.match",
                    },
                },
            },

            {
                $addFields: {
                    difficultyMultiplier: {
                        $switch: {
                            branches: [
                                {
                                    case: { $eq: ["$difficulty", "easy"] },
                                    then: 1,
                                },
                                {
                                    case: { $eq: ["$difficulty", "medium"] },
                                    then: 2,
                                },
                                {
                                    case: { $eq: ["$difficulty", "hard"] },
                                    then: 3,
                                },
                            ],
                            default: 1,
                        },
                    },
                },
            },

            {
                $addFields: {
                    difficultyScore: {
                        $multiply: [
                            "$estimatedNumber",
                            "$difficultyMultiplier",
                        ],
                    },
                },
            },

            { $sort: { difficultyScore: -1 } },
            { $limit: 2 },
        ];

        const ideas = await Idea.aggregate(pipeline);
        res.json(ideas);
    } catch (err) {
        next(err);
    }
});

router.get("/mine/summary", protect, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const summary = await Idea.aggregate([
            { $match: { user: userId } },
            {
                $facet: {
                    counts: [
                        {
                            $group: {
                                _id: null,
                                totalIdeas: { $sum: 1 },
                                totalUpvotes: { $sum: "$upvotes" },
                                totalViews: { $sum: "$views" },
                                avgUpvotes: { $avg: "$upvotes" },
                            },
                        },
                    ],
                    topTags: [
                        { $unwind: "$tags" },
                        { $group: { _id: "$tags", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 3 },
                    ],
                    recentIdeas: [
                        { $sort: { createdAt: -1 } },
                        { $limit: 3 },
                        { $project: { title: 1, createdAt: 1 } },
                    ],
                },
            },
        ]);
        res.json(summary[0]);
    } catch (err) {
        next(err);
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
router.post("/", protect, async (req, res, next) => {
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
        } = req.body || {};

        if (!title.trim() || !summary?.trim() || !description?.trim()) {
            return res
                .status(404)
                .json({ error: "Content for idea not filled correctly." });
        }

        const newIdea = new Idea({
            user: req.user._id, // Attach the authenticated user's ID
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
 * @route           GET /api/ideas/featured
 * @description     Get top featured ideas by upvotes
 * @access          Public
 */
router.get("/featured", async (req, res, next) => {
    try {
        const limit = parseInt(req.query._limit) || 4;

        const featuredIdeas = await Idea.aggregate([
            { $match: { verified: true } },
            { $sort: { upvotes: -1 } },
            { $limit: limit },
        ]);

        res.json(featuredIdeas);
    } catch (err) {
        next(err);
    }
});

router.get("/latest", async (req, res, next) => {
    try {
        const limit = parseInt(req.query._limit) || 4;

        const latestIdeas = await Idea.aggregate([
            { $match: { verified: true } },
            { $sort: { createdAt: -1 } },
            { $limit: limit },
        ]);

        res.json(latestIdeas);
    } catch (error) {
        next(error);
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
 * @route           DELETE /api/routes/:id
 * @description     Delete an idea by ID
 * @access          Public
 * Removes the idea matching the provided ID from the data file.
 * Returns a success message or an error if not found or delete fails.
 *
 * @returns {Object} Success message or an error message.
 */
router.delete("/:id", protect, async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Idea not found." });
    }
    try {
        const ideaToDelete = await Idea.findById(id);
        if (!ideaToDelete) {
            return res.status(404).json({ error: "Idea not found." });
        }

        // Check if the user is authorized to delete this idea
        if (ideaToDelete.user.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ error: "Not authorized to delete this idea." });
        }

        await Idea.deleteOne({ _id: id });
        res.json({ message: "Idea deleted successfully." });
    } catch (err) {
        next(err);
    }
});

/**
 * @route           PUT /api/routes/:id
 * @description     Update an idea by ID
 * @access          Public
 * Updates the fields of an existing idea matching the provided ID.
 * Returns the updated idea or an error if not found or update fails.
 *
 * @returns {Object} The updated idea object or an error message.
 */
router.put("/:id", protect, async (req, res, next) => {
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
        } = req.body || {};

        console.log("to update", title);

        const ideaToUpdate = await Idea.findById(id);
        if (!ideaToUpdate) {
            return res.status(404).json({ error: "Idea not found." });
        }

        // Check if the user is authorized to update this idea
        if (ideaToUpdate.user.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ error: "Not authorized to update this idea." });
        }

        // Update the idea with the provided fields
        ideaToUpdate.title = title;
        ideaToUpdate.verified = verified;
        ideaToUpdate.summary = summary;
        ideaToUpdate.description = description;
        ideaToUpdate.tags =
            typeof tags === "string"
                ? tags
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                : [];
        ideaToUpdate.difficulty = difficulty;
        ideaToUpdate.estimatedTime = estimatedTime;
        ideaToUpdate.techStack =
            typeof techStack === "string"
                ? techStack
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                : [];
        ideaToUpdate.inspirationLink = inspirationLink;
        ideaToUpdate.author = {
            name: author?.name || "Anonymous",
            avatarUrl: author?.avatarUrl || "",
            githubUrl: author?.githubUrl || "",
        };

        const updatedIdea = await ideaToUpdate.save();
        console.log("Updated idea:", updatedIdea);
        res.json(updatedIdea);
    } catch (err) {
        next(err);
    }
});

export default router;
