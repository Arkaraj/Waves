import React, { useEffect, useState } from "react";
import AuthService from "../Services/AuthService";
import AddSongButton from "./AddSongButton";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ArtistList from "./ArtistList";

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
      <h1>home</h1>
      {loader ? (
        <div>
          <AddSongButton />
          <h2>Top 10 Songs</h2>
          <pre>{JSON.stringify(homeFeed.songs, null, 2)}</pre>
          <hr />
          <h2>Top 10 Artists</h2>
          {/* <pre>{JSON.stringify(homeFeed.artists, null, 2)}</pre> */}
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
