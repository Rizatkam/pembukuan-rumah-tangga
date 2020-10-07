const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
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
    avatar: {
      type: String,
    },
    token: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
    },
    gmail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = Mongoose.model("users", userSchema);

module.exports = User;
