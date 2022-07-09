import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>Hi, {user.username}</h1>
    </div>
  );
};

export default Profile;
