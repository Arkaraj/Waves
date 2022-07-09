import React, { useEffect, useState } from "react";
import AuthService from "../Services/AuthService";
import AddSongButton from "./AddSongButton";

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
          <h2>Songs</h2>
          <pre>{JSON.stringify(homeFeed.songs, null, 2)}</pre>
          <hr />
          <h2>Artists</h2>
          <pre>{JSON.stringify(homeFeed.artists, null, 2)}</pre>
        </div>
      ) : (
        <p className="loading"></p>
      )}
    </div>
  );
};

export default Home;
