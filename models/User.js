import { Schema, model } from "mongoose";
import { hash } from "bcrypt";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

export default model("User", UserSchema);
