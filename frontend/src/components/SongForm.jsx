import { useState } from "react";
import { useSongsContext } from "../hooks/useSongsContext";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";


function SongForm() {

  const { dispatch } = useSongsContext();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("");

  const [error, setError] = useState(null);

  const { user } = useAuthContext();



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
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  }

  return (
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
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
      <option value=""> </option>
                <option value="Careme">Careme</option>
                <option value="Avent">Avent</option>
                <option value="Esprit Saint">Esprit Saint</option>
                <option value="Marie">Marie</option>
      </select>

      <label>Content:</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <button>Add Song</button>
      {error && <div className="error">{error}</div>}
    </form>

    
  );
}

export default SongForm;
