const Mongoose = require("mongoose");

const tranSchema = new Mongoose.Schema(
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
    category_id: {
      type: Mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "category",
    },
    amount: {
      type: Number,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = Mongoose.model("transaction", tranSchema);

module.exports = Transaction;
