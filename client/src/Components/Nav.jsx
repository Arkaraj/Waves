import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";

const Nav = (props) => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );
  const onLogout = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  return (
    <div>
      <h1>Nav</h1>
      {isAuthenticated ? (
        <>
          <p>Hello {user.username}</p>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : null}
    </div>
  );
};

export default Nav;
