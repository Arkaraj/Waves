import React, { useState } from "react";
import ArtistService from "../Services/ArtistService";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const useStyles = () => {
  const theme = useTheme();
  return {
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  };
};

const CreateArtist = ({ open, setOpen, setChange }) => {
  const classes = useStyles();
  const [artist, setArtist] = useState({ name: "", dob: new Date(), bio: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setArtist({ ...artist, [e.target.name]: e.target.value });
  };
  const handleDateChange = (e) => {
    setArtist({ ...artist, dob: new Date(artist.dob) });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await ArtistService.createArtist(artist);
    if (data.success) {
      setMsg(data);
      setChange(true);
    } else {
      setMsg(data.message);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Name"
            name="name"
            type="text"
            required
            onChange={handleChange}
            autoComplete="Name"
            margin="dense"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="dob"
            label="DOB"
            type="date"
            required
            onChange={handleDateChange}
            autoComplete="current-dob"
            defaultValue={"2021-07-07"}
          />
          <br />
          {/* Bio: */}
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="bio"
            name="bio"
            onChange={handleChange}
            cols="30"
            rows="10"
            maxLength="300"
            required
          />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={classes.submit}
          >
            Create
          </Button>
        </form>
        {msg ? <pre>{JSON.stringify(msg, null, 2)}</pre> : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </>
  );
};

export default CreateArtist;
