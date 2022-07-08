import React, { useState } from "react";
import ArtistService from "../Services/ArtistService";

const CreateArtist = () => {
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
    } else {
      setMsg(data.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        Name:
        <input type="text" name="name" onChange={handleChange} required />
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
    </div>
  );
};

export default CreateArtist;
