const Mongoose = require("mongoose");

const transactionSchema = new Mongoose.Schema(
  {
    record_id: {
      type: Mongoose.Types.ObjectId,
      trim: true,
      ref: "records",
    },
    wallet_id: {
      type: Mongoose.Types.ObjectId,
      trim: true,
      ref: "wallets",
    },
    category_id: {
      type: Mongoose.Types.ObjectId,
      trim: true,
      ref: "categories",
    },
    subcategory_id: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    note: {
      type: String,
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

const Transaction = Mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
