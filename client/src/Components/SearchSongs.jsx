import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import SongService from "../Services/SongService";
import SearchSongComponent from "./SearchSongComponent";

const SearchSongs = () => {
  const { songName } = useParams();
  const [songs, setSongs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    SongService.searchSong(songName).then((data) => {
      if (data.success) {
        setSongs(data.songs);
        setLoaded(true);
      } else {
      }
    });
  }, [songName]);

  return (
    <>
      {loaded ? (
        <Grid container spacing={2}>
          {/* <pre>{JSON.stringify(songs, null, 2)}</pre> */}
          {songs.map((song) => (
            <SearchSongComponent song={song} key={song._id} />
          ))}
        </Grid>
      ) : (
        <p className="loading"></p>
      )}
    </>
  );
};

export default SearchSongs;
