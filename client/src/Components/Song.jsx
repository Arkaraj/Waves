import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import { AuthContext } from "../Context/AuthContext";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import SongService from "../Services/SongService";
import Ratings from "./Ratings";

const Song = (props) => {
  const { id } = useParams();

  const [song, setSong] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { user } = useContext(AuthContext);
  let val = [{ name: "", score: 0 }];
  const checkUser = (rt) => {
    return rt.user == user._id;
  };
  const storeScore = (song) => {
    val = song.rating.filter(checkUser);
    return val.length != 0;
  };

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
        <Stack>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
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
                <Typography gutterBottom variant="h6" component="p">
                  Average Rating: {song.avgRating} ({song.rating.length} users
                  rated)
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
          <Ratings
            score={storeScore(song) ? val[0].score : 0}
            id={song._id}
            newRating={val.length == 0}
          />
        </Stack>
      ) : (
        <p className="loading"></p>
      )}
    </>
  );
};

export default Song;
