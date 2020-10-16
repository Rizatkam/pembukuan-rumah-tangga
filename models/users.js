const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    googleAccount: {
      type: Object,
      required: true,
    },
    facebookAccount: {
      type: Object,
      required: true,
    },
    avatar: {
      type: String,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = Mongoose.model("User", userSchema);

module.exports = User;
