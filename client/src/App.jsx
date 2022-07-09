import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./Components/Nav";
import Login from "./Components/Login";
import PublicRoute from "./Hocs/PublicRoutes";
import PrivateRoutes from "./Hocs/PrivateRoutes";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Footer from "./Components/Footer";
import Artist from "./Components/Artist";
import Song from "./Components/Song";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="main">
          <Routes>
            <Route exact path="/" element={<h1>WAVES</h1>} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoutes>
                  <Home />
                </PrivateRoutes>
              }
            />
            <Route
              path="/artist/:id"
              exact
              element={
                <PrivateRoutes>
                  <Artist />
                </PrivateRoutes>
              }
            />
            <Route
              path="/song/:id"
              exact
              element={
                <PrivateRoutes>
                  <Song />
                </PrivateRoutes>
              }
            />
          </Routes>
          <br />
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
