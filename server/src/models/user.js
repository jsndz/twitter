import mongoose from "mongoose";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestaps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const encryptedPassword = bcrypt.hashSync(user.password, SALT);
  user.password = encryptedPassword;
  next();
});

userSchema.methods.comparePasswords = function compare(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.genJwt = function generate() {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    "twitter_secrete",
    {
      expiresIn: "1h",
    }
  );
};
const User = mongoose.model("User", userSchema);

export default User;
