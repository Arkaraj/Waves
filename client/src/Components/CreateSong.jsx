import React, { useState, useEffect } from "react";
import ArtistService from "../Services/ArtistService";
import SongService from "../Services/SongService";
import AddArtistButton from "./AddArtistButton";
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks";

const CreateSong = () => {
  const [artists, setArtists] = useState([]);
  const [change, setChange] = useState(false);
  const [song, setSong] = useState({
    name: "",
    dateOfRelease: new Date(),
    artists: [],
  });
  const [artistName, setArtistName] = React.useState([]);
  const [msg, setMsg] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

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
        setMsg(data.message);
      } else {
        setMsg(img.message);
      }
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
        <br />
        <AddArtistButton setChange={setChange} />
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
