import React, { useState, useEffect } from "react";
import ArtistService from "../Services/ArtistService";
import SongService from "../Services/SongService";
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks";

const CreateSong = () => {
  const [artists, setArtists] = useState([]);
  const [song, setSong] = useState({
    name: "",
    dateOfRelease: new Date(),
    artists: [],
  });
  const [artistName, setArtistName] = React.useState([]);
  const [msg, setMsg] = useState("");
  let art = [];
  const addArtist = () => {
    // let art = [];
    artistName.map((n) => {
      art.push(artists.find((a) => a.name == n)._id);
    });
    // setSong({ ...song, artists: art });
  };

  useEffect(() => {
    ArtistService.getAllArtist().then((data) => {
      if (data.success) {
        setArtists(data.artists);
      } else {
      }
    });
  }, []);

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
      setMsg(data);
    } else {
      setMsg(data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Name:
        <input
          type="text"
          name="name"
          value={song.name}
          onChange={handleChange}
          required
        />
        <br />
        Date Released:
        <input
          type="date"
          name="dateOfRelease"
          onChange={handleDateChange}
          required
        />
        <br />
        Artists:
        <MultipleSelectCheckmarks
          artists={artists}
          artistName={artistName}
          setArtistName={setArtistName}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {msg ? <pre>{JSON.stringify(msg, null, 2)}</pre> : null}
    </div>
  );
};

export default CreateSong;
