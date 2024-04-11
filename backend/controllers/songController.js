import Song from "../models/songModel.js";
import mongoose from "mongoose";

//get all songs
const getSongs = async (req, res) => {
  const songs = await Song.find({});

  res.status(200).json(songs);
};

//get a sing song
const getSong = async (req, res) => {
  const { id } = req.params;

  //mongoose method to check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    //we return immediately because we don't want the code to continue processing
    return res.status(404).json({ message: `No song with id: ${id}` });
  }

  const song = await Song.findById(id);

  if (!song) {
    //we return immediately because we don't want the code to continue processing
    return res.status(404).json({ message: `No song with id: ${id}` });
  }

  res.status(200).json(song);
};

//create a new song
const createSong = async (req, res) => {
  const { title, content, artist, genre, rating } = req.body;

  //add the song to db
  try {
    const song = await Song.create({ title, content, artist, genre, rating });
    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete a song
const deleteSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    //we return immediately because we don't want the code to continue processing
    return res.status(404).json({ message: `No song with id: ${id}` });
  }

  const song = await Song.findByIdAndDelete({ _id: id });

  if (!song) {
    //we return immediately because we don't want the code to continue processing
    return res.status(404).json({ message: `No song with id: ${id}` });
  }

  res.status(200).json(song);
};

//update a song
const updateSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    //we return immediately because we don't want the code to continue processing
    return res.status(404).json({ message: `No song with id: ${id}` });
  }

  const song = await Song.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,},
      {new: true}
    
  );

  if (!song) {
    //we return immediately because we don't want the code to continue processing
    return res.status(404).json({ message: `No song with id: ${id}` });
  }

  //returns the updated song
  res.status(200).json(song);
};

export { createSong, getSong, getSongs, deleteSong, updateSong };
