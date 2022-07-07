import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";

const Login = (props) => {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);

  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const onChangeCred = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.login(cred).then((data) => {
      if (data.success) {
        setMessage(data.message);
        const { user, isAuthenticated } = data;
        setUser(user);
        setIsAuthenticated(isAuthenticated);

        props.history.push("./");
      } else {
        setMessage(data.message);
      }
    });
  };

  return (
    <div>
      <h1>login</h1>

      <form onSubmit={handleSubmit}>
        Email:
        <input
          type="email"
          name="email"
          onChange={onChangeCred}
          placeholder="Enter email"
          required
        />
        <br />
        Password:
        <input
          type="password"
          name="password"
          onChange={onChangeCred}
          placeholder="Enter password"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message ? (
        <>
          <h2>{message}</h2>
        </>
      ) : null}
    </div>
  );
};

export default Login;
