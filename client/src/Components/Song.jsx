import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import SongService from "../Services/SongService";

const Song = (props) => {
  const { id } = useParams();

  const [song, setSong] = useState(null);
  const [loaded, setLoaded] = useState(false);

  let artists = [];

  useEffect(() => {
    SongService.getSong(id).then((data) => {
      setSong(data.song);
      setLoaded(true);
    });
  }, [id]);

  return (
    <>
      {loaded ? (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={song.coverImage}
              alt={song.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {song.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="p">
                Release Date: {new Date(song.dateOfRelease).toDateString()}
              </Typography>
              <p style={{ display: "none" }}>
                {song.artists.map((ar) => artists.push(ar.name))}
              </p>
              <p>Artists:</p>
              <Typography variant="body2" color="text.secondary">
                {artists.join(", ")}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <p className="loading"></p>
      )}
    </>
  );
};

export default Song;
