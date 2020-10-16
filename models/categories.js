const Mongoose = require("mongoose");

const categorySchema = new Mongoose.Schema(
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
    type: {
      type: String,
      required: true,
      trim: true,
    },
    parrent_id: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = Mongoose.model("Category", categorySchema);

module.exports = Category;
