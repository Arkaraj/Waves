import React from "react";
import { useParams } from "react-router-dom";

const Artist = (props) => {
  const { id } = useParams();
  return (
    <div>
      <h1>Artist Name: {id}</h1>
    </div>
  );
};

export default Artist;
