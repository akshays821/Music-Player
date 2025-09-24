import mongoose from "mongoose";

const schema = mongoose.Schema


// Song Schema
const songSchema = new schema({
  title: { type: String, required: true },   
  artist: { type: String, required: true },  
  album: { type: String },                   
  url: { type: String, required: true },     

  // who uploaded this song
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // only store the user’s _id
    ref: "User",                          // reference the User model
    required: true
  }
}, { timestamps: true });

const Song = mongoose.model("Song", songSchema);
export default Song;
