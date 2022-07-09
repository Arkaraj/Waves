import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
// import Typography from "@mui/material/Typography";

const Ratings = ({ score }) => {
  const [value, setValue] = useState(score);
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      {/* <Typography component="legend">Rate</Typography> */}
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
};

export default Ratings;
