const Mongoose = require("mongoose");

const budgetSchema = new Mongoose.Schema(
  {
    book_id: {
      type: Mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "bookrecord",
    },
    category_id: {
      type: Mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "category",
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    from: {
      type: Date,
      required: true,
      trim: true,
    },
    to: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Budget = Mongoose.model("budget", budgetSchema);

module.exports = Budget;
