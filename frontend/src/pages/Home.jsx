import { useEffect, useState } from "react";
import axios from "axios";
import SongDetails from "../components/SongDetails";
import SongForm from "../components/SongForm";
import { useSongsContext } from "../hooks/useSongsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const { songs, dispatch } = useSongsContext();

  const { user } = useAuthContext();

  //to implement search
  const [searchTerm, setSearchTerm] = useState("");

  //state for loading status
  const [isLoading, setIsLoading] = useState(false);

  //state for infinite scrolling
  const [hasMore, setHasMore] = useState(true);


 

  const fetchNextPage = async () => {
    

    try {
      setIsLoading(true);
      // const response = await axios.get(
      //   `http://localhost:4000/api/songs?searchTerm=${searchTerm}&page=${
      //     songs.page + 1
      //   }`
      // );

      const currentPage = songs.length / 6 + 1; // Assuming pageSize of 10
      const response = await axios.get(
        `http://localhost:4000/api/songs?searchTerm=${searchTerm}&page=${currentPage}`
      );

      dispatch({ type: "FETCH_NEXT_PAGE", payload: response.data });

      //  setHasMore(response.headers["x-has-more"]);
      if (response.headers["x-has-more"] === "false") {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

   
    console.log(searchTerm);


    try {
      const response = await axios.get(
        `http://localhost:4000/api/songs?searchTerm=${searchTerm}`
      );
      dispatch({ type: "SET_SONGS", payload: response.data });

      if (response.headers["x-has-more"] === "false") {
        setHasMore(false);
      } else {
        setHasMore(true);
      }


    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/songs", {
          headersResponse: true,
        });
        dispatch({ type: "SET_SONGS", payload: response.data });

        setHasMore(response.headers["x-has-more"]);
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
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search a song"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>

        <InfiniteScroll
          dataLength={songs.length}
          next={fetchNextPage}
          hasMore={hasMore}
          loader={isLoading && <div>Loading...</div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {songs &&
            songs.map((song) => <SongDetails key={song._id} song={song} />)}
        </InfiniteScroll>
      </div>

      <SongForm />
    </div>
  );
}

export default Home;
