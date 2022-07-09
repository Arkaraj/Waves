import React, { useState } from "react";
import ArtistService from "../Services/ArtistService";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CreateArtist = ({ open, setOpen, setChange }) => {
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
          Name:
          <TextField
            type="text"
            name="name"
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
          />
          <br />
          DOB:
          <input type="date" name="dob" onChange={handleDateChange} required />
          <br />
          Bio:
          <textarea
            name="bio"
            onChange={handleChange}
            cols="30"
            rows="10"
            maxLength="300"
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>
        {msg ? <pre>{JSON.stringify(msg, null, 2)}</pre> : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Save</Button>
      </DialogActions>
    </>
  );
};

export default CreateArtist;
