import { useState } from "react";
import { useSongsContext } from "../hooks/useSongsContext";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from 'react-toastify';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Include CSS for styling

function SongForm() {

  const { dispatch } = useSongsContext();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("");

  const [error, setError] = useState(null);

  const { user } = useAuthContext();


  //quill, as quill does not understand (e => {setContent(e.target.value)})
  const handleChange = (value) => {
    setContent(value);
    
  };

  async function handleSubmit(e) {
    //prevent the default function of the form which is to reload page
    e.preventDefault();

    //check if user is logged in
    if (!user) {
      setError("You must be logged in");
      return;
    }


        //make a post request to create a new song

    const song = {
      title,
      artist,
      content,
      genre,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/songs",
        song,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${user.token}`,
          },
        }
      );


      setTitle("");
      setArtist("");
      setContent("");
      setGenre("");
      dispatch({type: 'CREATE_SONG', payload: response.data});
      

      //if there was previously an error remove it
      setError(null);
      toast.success("Song added successfully!", {
        position: "bottom-center",
        autoClose: 3000, // Auto-closes after 3 seconds
        // ... other options
    }); 

    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <div className="d-flex justify-content-center">
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new song</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />

      <label>Artist:</label>
      <input
        type="text"
        onChange={(e) => setArtist(e.target.value)}
        value={artist}
      />

      <label>Genre:</label>
      <select className="form-select" value={genre} onChange={(e) => setGenre(e.target.value)}>
      <option value=""> </option>
                <option value="Louange">LOUANGES ET ACTION DE GRACE</option>
                <option value="Confiance">CONFIANCE – ESPERANCE</option>
                <option value="Esprit Saint">ESPRIT SAINT</option>
                <option value="Marie">Marie</option>
      </select>

      <label className="mt-3">Content:</label>
      {/* <textarea value={content} onChange={(e) => setContent(e.target.value)} /> */}

     
      <ReactQuill 
        theme="snow" // Optional theme for styling
        value={content}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
          ],
        }}
      />


      <button className="mt-3">Add Song</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>

    
  );
}

export default SongForm;
