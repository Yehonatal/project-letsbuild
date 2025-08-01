import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        summary: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "medium",
        },
        estimatedTime: {
            type: String,
            default: "1-3 days",
        },
        techStack: {
            type: [String],
            default: [],
        },
        upvotes: {
            type: Number,
            default: 0,
        },
        views: {
            type: Number,
            default: 0,
        },
        inspirationLink: {
            type: String,
            trim: true,
        },
        author: {
            name: {
                type: String,
                required: true,
            },
            avatarUrl: {
                type: String,
            },
            githubUrl: {
                type: String,
            },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Idea", ideaSchema);
