import React, { useState, useContext } from "react";
import {
  Grid,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Button,
  Link,
  Checkbox,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { AuthContext } from "../Context/AuthContext";
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
            Sign in
          </Typography>
          <form sx={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              onChange={onChangeCred}
              autoComplete="email"
              type="email"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
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
