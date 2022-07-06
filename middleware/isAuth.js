import passport from "passport";
import { Strategy as JWTStrategy } from "passport-jwt";
import { config } from "../config";
import User from "../models/User";

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// authorization Middleware
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: `${config.SECRET}`,
    },
    (payload, done) => {
      User.findById(payload.sub, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else done(null, false);
      });
    }
  )
);
