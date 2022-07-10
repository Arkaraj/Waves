import React, { useState, useEffect } from "react";
import ArtistService from "../Services/ArtistService";
import SongService from "../Services/SongService";
import AddArtistButton from "./AddArtistButton";
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks";
import { Grid, TextField, Button, Paper, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Message from "./Message";
import { useNavigate } from "react-router-dom";

const useStyles = () => {
  const theme = useTheme();
  return {
    loginDiv: {
      padding: "2%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "1rem",
      margin: theme.breakpoints.up("sm") ? "" : "1rem",
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    message: { width: "100%" },
  };
};

const CreateSong = () => {
  const classes = useStyles();
  const [artists, setArtists] = useState([]);
  const [change, setChange] = useState(false);
  const [song, setSong] = useState({
    name: "",
    dateOfRelease: new Date(),
    artists: [],
  });
  const [artistName, setArtistName] = React.useState([]);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("success");

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  let art = [];
  const addArtist = () => {
    artistName.map((n) => {
      art.push(artists.find((a) => a.name == n)._id);
    });
  };
  let navigate = useNavigate();
  useEffect(() => {
    ArtistService.getAllArtist().then((data) => {
      if (data.success) {
        setArtists(data.artists);
      } else {
      }
    });
  }, [change]);

  const handleChange = (e) => {
    setSong({ ...song, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setSong({ ...song, dateOfRelease: new Date(song.dateOfRelease) });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    addArtist();
    const data = await SongService.createSong({ ...song, artists: art });
    if (data.success) {
      const fd = new FormData();
      fd.append("image", selectedFile, selectedFile.name);
      const img = await SongService.addCoverImageToSong(data.song._id, fd);
      if (img.success) {
        setMessage(data.message);
        setStatus("success");
        navigate("/home");
      } else {
        setMessage(img.message);
        setStatus("error");
      }
    } else {
      setMessage(data.message);
      setStatus("error");
    }
  };

  return (
    <div>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={classes.loginDiv}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form sx={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              type="text"
              required
              fullWidth
              label="Name"
              name="name"
              onChange={handleChange}
              autoComplete="Name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="dateOfRelease"
              label="Date of Release"
              type="date"
              required
              onChange={handleDateChange}
              autoComplete="current-dateOfRelease"
              defaultValue={"2021-07-07"}
            />
            ArtWork:
            <input
              type="file"
              name="image"
              onChange={changeHandler}
              accept="image/png, image/gif, image/jpeg"
              required
            />
            {isFilePicked ? (
              <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
                <p>
                  lastModifiedDate:{" "}
                  {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p>Select a file to show details</p>
            )}
            <Stack direction="row" spacing={2}>
              <Stack spacing={2}>
                Artists:
                <MultipleSelectCheckmarks
                  artists={artists}
                  artistName={artistName}
                  setArtistName={setArtistName}
                />
              </Stack>
              <AddArtistButton setChange={setChange} />
            </Stack>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={classes.submit}
            >
              Create
            </Button>
            <Grid container>
              <Grid item>
                {message ? (
                  <>
                    <Message
                      msg={message}
                      status={status}
                      sx={classes.message}
                    />
                  </>
                ) : null}
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      {/* {msg ? <pre>{JSON.stringify(msg, null, 2)}</pre> : null} */}
    </div>
  );
};

export default CreateSong;
