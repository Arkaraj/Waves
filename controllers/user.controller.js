import bcrypt from "bcrypt";
import { customErrorHandler } from "../helper/ErrorHandler";
import { signToken } from "../helper/jwtHelper";

// Models
import User from "../models/User";

export default {
  getAllUsers: async (_req, res) => {
    try {
      const user = await User.find({}, { password: 0 });

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getSpecificUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);

      if (user) {
        res.status(200).json({ user, success: true });
      } else {
        return customErrorHandler(res, 400, "No Such User");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  registerUser: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const emailUser = await User.findOne({ email });
      if (emailUser) {
        return customErrorHandler(res, 400, "Email is already taken");
      } else {
        const newUser = new User({ username, password, email });
        await newUser.save();
        return res
          .status(200)
          .json({ msg: "New User Registered!", success: true, newUser });
      }
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return customErrorHandler(res, 400, "Invalid Email");
      } else {
        bcrypt.compare(password, user.password, function (err, validate) {
          if (err) {
            return customErrorHandler(res, undefined, undefined, err);
          }
          if (!validate) {
            return customErrorHandler(res, 400, "Invalid Password");
          } else {
            // Logged in
            const token = signToken(user._id);
            // httpOnly doen't let client side js touch the cookie saves from cross scripting attacks
            res.cookie("access_token", token, {
              httpOnly: true,
              sameSite: true,
            });

            res.status(200).json({
              user,
              isAuthenticated: true,
              success: true,
            });
          }
        });
      }
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },

  logoutUser: async (_req, res) => {
    try {
      res.clearCookie("access_token");
      res.status(200).json({ msg: "Logged out", user: {}, success: true });
    } catch (err) {
      return customErrorHandler(res, undefined, undefined, err);
    }
  },
};
