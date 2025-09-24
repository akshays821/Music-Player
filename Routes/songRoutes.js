import express from "express";

import { createSong, getSongs, getMySongs, deleteSong } from "../Controllers/songController.js";
import { authenticateToken } from "../Middlewares/authMiddleware.js";
import upload from "../Middlewares/upload.js";

const songRouter = express.Router();

// Public route
songRouter.get("/", getSongs);

// Protected routes
songRouter.post("/upload", authenticateToken, upload.single("song"), createSong);
songRouter.get("/mine", authenticateToken, getMySongs);
songRouter.delete("/:id", authenticateToken, deleteSong);

export default songRouter;
