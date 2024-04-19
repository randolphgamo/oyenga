import SongDetails from "../components/SongDetails";
import { useState, useEffect } from "react";
import { useSongsContext } from "../hooks/useSongsContext";
import InfiniteScroll from "react-infinite-scroll-component";

import axios from "axios";
import Spinner from "../components/Spinner";

function Search() {
  const { songs, dispatch } = useSongsContext();

  //to implement search
  const [searchTerm, setSearchTerm] = useState("");

  //for genre select
  const [selectedGenre, setSelectedGenre] = useState("");

  //for search results heading
  const [searchResultsHeading, setSearchResultsHeading] = useState("");

  //for genre results heading
  const [genreResultsHeading, setGenreResultsHeading] = useState("");

  //state for infinite scrolling
  const [hasMore, setHasMore] = useState(true);

  //state for fetching next page loading status
  const [isLoading, setIsLoading] = useState(false);

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
        `http://localhost:4000/api/songs?searchTerm=${searchTerm}&genre=${selectedGenre}&page=${currentPage}`
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

    console.log(selectedGenre);

    searchTerm === ""
      ? setSearchResultsHeading("")
      : setSearchResultsHeading("Mot clé: " + searchTerm);

    selectedGenre === ""
      ? setGenreResultsHeading("")
      : setGenreResultsHeading("Catégorie: " + selectedGenre);

    try {
      const response = await axios.get(
        `http://localhost:4000/api/songs?searchTerm=${searchTerm}&genre=${selectedGenre}`
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
        const response = await axios.get(
          `http://localhost:4000/api/songs?searchTerm=${searchTerm}`,
          {
            headersResponse: true,
          }
        );
        dispatch({ type: "SET_SONGS", payload: response.data });

        setHasMore(response.headers["x-has-more"]);
      } catch (error) {
        console.log(error);
      }
    };

    //only execute the above if the user is logged in
    // this is to avoid unnecessary errors in console due to bearer token being null when not logged in

    fetchSongs();
  }, [dispatch]); // empty dependency array so it gets execute once.

  return (
    <>
      <div className="d-flex flex-column flex-md-row">
        <div className="d-flex border-end p-4 align-items-stretch">
          <form className="d-flex flex-column gap-2" onSubmit={handleSearch}>
            <div className="d-flex align-items-center gap-3">
              <label className="text-nowrap">Recherche</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
            <div className="d-flex align-items-center gap-3">
              <label className="text-nowrap">Catégorie: </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="form-select"
              >
                <option value=""> </option>
                <option value="Careme">Careme</option>
                <option value="Avent">Avent</option>
                <option value="Esprit Saint">Esprit Saint</option>
                <option value="Marie">Marie</option>
              </select>
            </div>
            <button className="mt-3">Rechercher</button>
          </form>
        </div>
        <div className="flex-grow-1">
          <div className="text-5xl m-5 border-bottom p-3 ">Les Résultats:<br/>
          {searchResultsHeading} {genreResultsHeading}
          </div>
          
          <InfiniteScroll
            dataLength={songs.length}
            next={fetchNextPage}
            hasMore={hasMore}
            loader={isLoading && <Spinner />}
          >
            {songs &&
              songs.map((song) => <SongDetails key={song._id} song={song} />)}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}

export default Search;
