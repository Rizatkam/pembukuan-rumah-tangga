const Mongoose = require("mongoose");

const currencySchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      uppercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Currency = Mongoose.model("currency", currencySchema);

module.exports = Currency;
