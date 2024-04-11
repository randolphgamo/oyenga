import React from "react";
import { useState } from "react";

const EditSongForm = ({ initialSong, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: initialSong.title,
    artist: initialSong.artist,
    genre: initialSong.genre,
    content: initialSong.content
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

       onSubmit(formData); // Pass form data to parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit song</h3>

      <label>Title:</label>
      <input type="text" name="title" onChange={handleChange} value={formData.title} />

      <label>Artist:</label>
      <input type="text" name="artist" onChange={handleChange} value={formData.artist} />

      <label>Genre:</label>
      <select value={formData.genre} name="genre" onChange={handleChange}>
        <option value=""> </option>
        <option value="Careme">Careme</option>
        <option value="Avent">Avent</option>
      </select>

      <label>Content:</label>
      <textarea value={formData.content} name="content" onChange={handleChange} />

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditSongForm;
