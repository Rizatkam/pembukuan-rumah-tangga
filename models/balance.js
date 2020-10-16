const Mongoose = require("mongoose");

const balanceSchema = new Mongoose.Schema(
  {
    record_id: {
      type: Mongoose.Types.ObjectId,
      trim: true,
      ref: "Record",
    },
    wallet_id: {
      type: Mongoose.Types.ObjectId,
      trim: true,
      ref: "Wallet",
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

const Balance = Mongoose.model("Balance", balanceSchema);

module.exports = Balance;
