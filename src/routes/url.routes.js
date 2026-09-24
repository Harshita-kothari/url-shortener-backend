import express from "express";
import generateCode from "../utils/generateCode.js";
import urlModel from "../models/url.model.js";

const router = express.Router();

// POST /api/url
router.post("/", async function (req, res) {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                error: "Please enter a URL"
            });
        }

        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            return res.status(400).json({
                error: "Please enter a valid URL starting with http:// or https://"
            });
        }

        if (url.length > 2048) {
            return res.status(400).json({
                error: "URL is too long."
            });
        }

        const code = generateCode();

        const newUrl = await urlModel.create({
            originalUrl: url,
            shortCode: code
        });

        return res.status(201).json({
            message: "url shortened successfully",
            data: {
                originalUrl: newUrl.originalUrl,
                shortCode: newUrl.shortCode
            }
        });

    } catch (error) {
        console.error("Error creating short URL:", error);

        return res.status(500).json({
            error: "Failed to create short URL",
            message: error.message
        });
    }
});


// GET /api/url
router.get("/", async function (req, res) {
    try {
        const urls = await urlModel.find();

        return res.status(200).json({
            message: "URLs fetched successfully",
            data: {
                urls
            }
        });

    } catch (error) {
        console.error("Error fetching URLs:", error);

        return res.status(500).json({
            error: "Failed to fetch URLs",
            message: error.message
        });
    }
});


// DELETE /api/url/:id
router.delete("/:id", async function (req, res) {
    try {
        const { id } = req.params;

        const url = await urlModel.findById(id);

        if (!url) {
            return res.status(404).json({
                message: "url not found"
            });
        }

        await urlModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "url deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting URL:", error);

        return res.status(500).json({
            error: "Failed to delete URL",
            message: error.message
        });
    }
});

export default router;