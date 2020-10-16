const Mongoose = require("mongoose");

const budgetSchema = new Mongoose.Schema(
  {
    record_id: {
      type: Mongoose.Types.ObjectId,
      trim: true,
      ref: "records",
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

const Budget = Mongoose.model("Budget", budgetSchema);

module.exports = Budget;
