const Mongoose = require("mongoose");

const walletSchema = new Mongoose.Schema(
  {
    record_id: {
      type: Mongoose.Types.ObjectId,
      trim: true,
      ref: "Record",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = Mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
