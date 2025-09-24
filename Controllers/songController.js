import Song from "../Models/songsModel.js";
import cloudinary from "../Config/cloudinary.js";

// CREATE a new song (with Cloudinary upload)
export const createSong = async (req, res) => {
  try {
    const file = req.file; // file comes from multer

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto", 
      folder : "music playlist"
      
      // audio/video supported
    });

    const song = await Song.create({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      url: result.secure_url, // auto set from cloudinary
      createdBy: req.user.id, // from JWT middleware
    });

    res.status(201).json({ message: "Song uploaded", song });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all songs
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate("createdBy", "name email");
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET songs of logged-in user
export const getMySongs = async (req, res) => {
  try {
    const songs = await Song.find({ createdBy: req.user.id });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a song
export const deleteSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) return res.status(404).json({ error: "Song not found" });

    // only owner can delete
    if (song.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await song.deleteOne();
    res.json({ message: "Song deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
