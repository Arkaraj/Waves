import React, { useEffect, useState } from "react";
import AuthService from "../Services/AuthService";
import AddSongButton from "./AddSongButton";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ArtistList from "./ArtistList";
import SongList from "./SongList";

const Home = () => {
  const [homeFeed, setHomeFeed] = useState({ songs: [], artists: [] });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    AuthService.getHomeFeed().then((data) => {
      if (data.success) {
        setHomeFeed({ songs: data.songs, artists: data.artists });
        setLoader(true);
      } else {
      }
    });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {loader ? (
        <div>
          <div className="songHeading">
            <h2>Top 10 Songs</h2>
            <AddSongButton />
          </div>
          {/* <pre>{JSON.stringify(homeFeed.songs, null, 2)}</pre> */}
          <SongList songs={homeFeed.songs} />
          <hr />
          <h2>Top 10 Artists</h2>
          <ArtistList artists={homeFeed.artists} />
        </div>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default Home;
