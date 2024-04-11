import { useEffect } from "react";
import axios from "axios";
import SongDetails from "../components/SongDetails";
import SongForm from "../components/SongForm";
import { useSongsContext } from "../hooks/useSongsContext";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  const {songs, dispatch} = useSongsContext();

  const {user} = useAuthContext();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/songs", );
        dispatch({type: 'SET_SONGS', payload: response.data});


      } catch (error) {
        console.log(error);
      }
    };

    //only execute the above if the user is logged in
    // this is to avoid unnecessary errors in console due to bearer token being null when not logged in
    if (user) {
      fetchSongs();
    }

      }, [dispatch, user]); // empty dependency array so it gets execute once.
  return (
    <div className="home">
      <div className="songs">
        {songs && songs.map((song) => ( <SongDetails key={song._id} song={song} />)  )}
      </div>

      <SongForm />
    </div>
  );
}

export default Home;
