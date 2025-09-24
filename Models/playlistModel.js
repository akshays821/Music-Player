import mongoose from "mongoose";

const schema = mongoose.Schema;

const playlistSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song", // link to Song model
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // who owns this playlist
    required: true,
  }
}, { timestamps: true });

const Playlist = mongoose.model("Playlist", playlistSchema);
export default Playlist;
