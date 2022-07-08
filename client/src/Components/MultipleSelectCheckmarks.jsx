import * as React from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelectCheckmarks = ({ artists, artistName, setArtistName }) => {
  const handleChange = (e) => {
    let value = e.target.value;

    setArtistName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Artist</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={artistName}
          onChange={handleChange}
          input={<OutlinedInput label="Artist" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {artists.map((art) => (
            <MenuItem key={art._id} value={art.name}>
              <Checkbox checked={artistName.indexOf(art.name) > -1} />
              <ListItemText primary={art.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectCheckmarks;
