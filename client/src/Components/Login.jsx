import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import Message from "./Message";

const Login = (props) => {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("success");

  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const onChangeCred = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.login(cred).then((data) => {
      if (data.success) {
        setMessage(data.message);
        setStatus("success");
        const { user, isAuthenticated } = data;
        setUser(user);
        setIsAuthenticated(isAuthenticated);

        // props.history.push("./");
      } else {
        setMessage(data.message);
        setStatus("error");
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
          <Message msg={message} status={status} />
        </>
      ) : null}
    </div>
  );
};

export default Login;
