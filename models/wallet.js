const Mongoose = require("mongoose");

const walletSchema = new Mongoose.Schema(
  {
    bookRecord: {
      type: Mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "bookrecord",
    },
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

const Wallet = Mongoose.model("wallet", walletSchema);

module.exports = Wallet;
