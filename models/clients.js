const Mongoose = require("mongoose");

const clientSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    origin: {
      type: String, // website or mobile
      required: true,
      lowercase: true,
      trim: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client = Mongoose.model("Client", clientSchema);

module.exports = Client;
