import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      <h1>Hi, {user.username}</h1>
    </div>
  );
};

export default Profile;
