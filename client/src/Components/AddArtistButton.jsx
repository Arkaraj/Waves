import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CreateArtist from "./CreateArtist";

const AddArtistButton = ({ setChange }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        + Add Artist
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Artist</DialogTitle>
        <CreateArtist open={open} setOpen={setOpen} setChange={setChange} />
      </Dialog>
    </div>
  );
};

export default AddArtistButton;
