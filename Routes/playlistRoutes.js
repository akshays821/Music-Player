import express from "express";
import {
  createPlaylist,
  getMyPlaylists,
  getPlaylistById,
  renamePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../Controllers/playlistController.js";
import { authenticateToken } from "../Middlewares/authMiddleware.js";

const playlistRouter = express.Router();

// All routes protected (need login)
playlistRouter.use(authenticateToken);

// CREATE new playlist
playlistRouter.post("/", createPlaylist);

// GET all my playlists
playlistRouter.get("/", getMyPlaylists);

// GET one playlist (with songs populated)
playlistRouter.get("/:id", getPlaylistById);

// RENAME playlist
playlistRouter.put("/:id/rename", renamePlaylist);

// DELETE playlist
playlistRouter.delete("/:id", deletePlaylist);

// ADD song to playlist
playlistRouter.post("/:id/add-song", addSongToPlaylist);

// REMOVE song from playlist
playlistRouter.post("/:id/remove-song", removeSongFromPlaylist);

export default playlistRouter;
