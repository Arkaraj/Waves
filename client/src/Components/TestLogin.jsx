import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import AuthService from "../Services/AuthService";
import Message from "./Message";

const useStyles = () => {
  const theme = useTheme();
  return {
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage: "url(https://source.unsplash.com/random)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.grey[900]
          : theme.palette.grey[50],
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderBottomLeftRadius: "1rem",
      borderTopLeftRadius: "1rem",
    },
    loginDiv: {
      padding: "2%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderTopRightRadius: "1rem",
      borderBottomRightRadius: "1rem",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  };
};

const TestLogin = () => {
  const classes = useStyles();

  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("success");

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
      setStatus("success");
      if (data.success) {
        setUser({ username: "", password: "", email: "" });

        // execute after 2 secs
        timerID = setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setMessage(data.message);
        setStatus("error");
      }
    });
  };

  return (
    <Grid container component="main" sx={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} sx={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={classes.loginDiv}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20%",
            marginBottom: "20%",
          }}
        >
          <Avatar sx={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form sx={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              name="username"
              type="text"
              onChange={onChangeCred}
              autoComplete="Name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              onChange={onChangeCred}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={onChangeCred}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
          {message ? (
            <>
              <Message msg={message} status={status} />
            </>
          ) : null}
        </div>
      </Grid>
    </Grid>
  );
};

export default TestLogin;
