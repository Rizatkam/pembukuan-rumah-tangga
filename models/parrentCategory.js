const Mongoose = require("mongoose");

const parrentCategorySchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      uppercase: true,
    },
    type_id: {
      type: Mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "categorytype",
    },
  },
  {
    timestamps: true,
  }
);

const ParrentCategory = Mongoose.model(
  "parrentcategory",
  parrentCategorySchema
);

module.exports = ParrentCategory;
