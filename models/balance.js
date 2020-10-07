const Mongoose = require("mongoose");

const balanceSchema = new Mongoose.Schema(
  {
    book_id: {
      type: Mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "bookrecord",
    },
    wallet_id: {
      type: Mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "wallet",
    },
    balance: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const balance = Mongoose.model("balance", balanceSchema);

module.exports = balance;
