import React, { useState } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import Rating from "@mui/material/Rating";
import SongService from "../Services/SongService";

const Ratings = ({ score, id, newRating }) => {
  const [value, setValue] = useState(score);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("success");
  const [msg, setMsg] = useState("Successfully Rated!");

  const handleSubmit = () => {
    if (value == 0) {
      setStatus("error");
      setMsg("Enter a Value for Rating!");
      setOpen(true);
    } else {
      SongService.rateSong({ rating: value, new: newRating }, id).then(
        (data) => {
          if (data.success) {
            setStatus("success");
            setMsg(data.message);
            setOpen(true);
          } else {
            setStatus("error");
            setMsg(data.message);
          }
        }
      );
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <br />
      <Button variant="outlined" onClick={handleSubmit}>
        Rate
      </Button>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Ratings;
