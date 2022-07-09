import React from "react";
import { useParams } from "react-router-dom";

const Song = (props) => {
  const { id } = useParams();
  return (
    <div>
      <h1>Song Name: {id}</h1>
    </div>
  );
};

export default Song;
