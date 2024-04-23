import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Include CSS for styling

const EditSongForm = ({ initialSong, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: initialSong.title,
    artist: initialSong.artist,
    genre: initialSong.genre,
    content: initialSong.content
  });

  const handleChange2 = (value) => {
    setFormData({ ...formData, content: value });
  }
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
      <select className="form-select" value={formData.genre} name="genre" onChange={handleChange}>
      <option value=""> </option>
      <option value="Louange">LOUANGES ET ACTION DE GRACE</option>
                <option value="Confiance">CONFIANCE – ESPERANCE</option>
                <option value="Esprit Saint">ESPRIT SAINT</option>
                <option value="Marie">MARIE</option>
      </select>

      <label>Content:</label>
      {/* <textarea value={formData.content} name="content" onChange={handleChange} /> */}

      <ReactQuill 
        theme="snow" // Optional theme for styling
        value={formData.content}
        name="content"
        onChange={handleChange2}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
          ],
        }}
      />


      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditSongForm;
