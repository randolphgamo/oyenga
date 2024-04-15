import axios from "axios";
import { useSongsContext } from "../hooks/useSongsContext";
import { useState } from "react";
import EditSongForm from "./EditSongForm";
import Modal from "./Modal";
import { useAuthContext } from "../hooks/useAuthContext";

function SongDetails({ song }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { dispatch } = useSongsContext();
  const { user } = useAuthContext();


  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditFormSubmit = async (data) => {
    console.log(data);
    const updatedSong = {
      title: data.title,
      artist: data.artist,
      genre: data.genre,
      content: data.content
    };

    try {
      const response = await axios.patch(
        `http://localhost:4000/api/songs/${song._id}`,
        updatedSong, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({ type: "UPDATE_SONG", payload: response.data }); // Update song data in context
        setIsEditModalOpen(false); // Close the modal
      } else {
        // Handle any potential errors from the API response
        console.error("Error updating song:", response.data);
      }
    } catch (error) {
      console.error("Error submitting edit form:", error);
    }
  };

  const handleDelete = async () => {
    const response = await axios.delete(
      `http://localhost:4000/api/songs/${song._id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch({ type: "DELETE_SONG", payload: response.data });
    }
  };

  return (
    <div className="song-details">
      <h4>{song.title}</h4>
      <p>
        <strong>Artist: </strong>
        {song.artist}
      </p>
      <p>
        <strong>Genre: </strong>
        {song.genre}
      </p>

      <span onClick={handleDelete} className="delete">
        <i className="bi bi-trash"></i>
      </span>
      <span onClick={handleEdit}>
        <i className="bi bi-pencil-square"></i>
      </span>

      {/* Modal (conditionally rendered) */}
      {isEditModalOpen && (
        <Modal onClose={handleEditModalClose}>
          {/* Edit form content */}
          <EditSongForm initialSong={song} onSubmit={handleEditFormSubmit} />
        </Modal>
      )}
    </div>
  );
}

export default SongDetails;
