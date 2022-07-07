import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState(null);

  let timerID = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChangeCred = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AuthService.register(user).then((data) => {
      setMessage(data.message);
      if (data.success) {
        setUser({ username: "", password: "", email: "" });

        // execute after 2 secs
        timerID = setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
      }
    });
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        Name:
        <input
          type="text"
          name="username"
          onChange={onChangeCred}
          placeholder="Enter Name"
          required
        />
        <br />
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

export default Register;
