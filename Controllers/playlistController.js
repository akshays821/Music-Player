import Playlist from "../Models/playlistModel.js";
import Song from "../Models/songsModel.js";

// CREATE a new playlist
export const createPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.create({
      name: req.body.name,
      owner: req.user.id,   // 👈 this was missing
      songs: [],            // empty by default
    });

    res.status(201).json({ message: "Playlist created", playlist });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// GET all playlists of logged-in user
export const getMyPlaylists = async (req, res) => {
  try {
    const userid = req.user.id;
    console.log(userid);
    
    const playlists = await Playlist.find({ owner: req.user.id });
    console.log();
    
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one playlist by id (with songs populated)
export const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate("songs") // full song details
      // .populate("createdBy", "name email");

    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    // only owner can view
    // if (playlist._id !== req.user.id) {
    //   return res.status(403).json({ error: "Not authorized" });
    // }

    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RENAME playlist
export const renamePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    if (playlist.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    playlist.name = req.body.name;
    await playlist.save();

    res.json({ message: "Playlist renamed", playlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE playlist
export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    if (playlist.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await playlist.deleteOne();
    res.json({ message: "Playlist deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD song to playlist
export const addSongToPlaylist = async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    if (playlist.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // check song exists
    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ error: "Song not found" });

    // prevent duplicates
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.json({ message: "Song added", playlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REMOVE song from playlist
export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    if (playlist.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    playlist.songs = playlist.songs.filter(
      (id) => id.toString() !== songId
    );
    await playlist.save();

    res.json({ message: "Song removed", playlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
