import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ArtistService from "../Services/ArtistService";

const Artist = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState({
    name: "",
    dob: "",
    bio: "",
    songs: [],
  });
  const [loaded, setLoaded] = useState(false);
  let songs = [];

  useEffect(() => {
    ArtistService.getArtist(id).then((data) => {
      setArtist(data.artist);
      setLoaded(true);
    });
  }, [id]);

  const card = (
    <Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Artist
        </Typography>
        <Typography variant="h5" component="div">
          {artist.name}
        </Typography>
        <Typography sx={{ my: 1.5 }} color="text.secondary">
          DOB{" "}
        </Typography>
        <Typography variant="body2">
          {new Date(artist.dob).toDateString()}
        </Typography>
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Bio
        </Typography>
        <Typography variant="body2">{artist.bio}</Typography>
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Average Rating
        </Typography>
        <Typography variant="body2">{artist.avgRating}</Typography>
        <br />
        <p>Songs:</p>
        <p style={{ display: "none" }}>
          {artist.songs.map((song) => songs.push(song.name))}
        </p>
        <Typography variant="body2" color="text.secondary">
          {songs.join(", ")}
        </Typography>
      </CardContent>
    </Fragment>
  );

  return (
    <>
      {loaded ? (
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">{card}</Card>
        </Box>
      ) : (
        <p className="loading"></p>
      )}
    </>
  );
};

export default Artist;
