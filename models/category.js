const Mongoose = require("mongoose");

const categorySchema = new Mongoose.Schema(
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
    },
    parrent_id: {
      type: Mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "parrentcategory",
    },
  },
  {
    timestamps: true,
  }
);

const Category = Mongoose.model("category", categorySchema);

module.exports = Category;
