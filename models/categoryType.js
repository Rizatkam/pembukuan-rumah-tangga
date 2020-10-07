const Mongoose = require("mongoose");

const categoryTypeSchema = new Mongoose.Schema(
  {
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

const CategoryType = Mongoose.model("categorytype", categoryTypeSchema);

module.exports = CategoryType;
