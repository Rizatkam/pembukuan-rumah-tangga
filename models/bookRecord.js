const Mongoose = require("mongoose");

const bookSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      required: true,
      trim: true,
    },
    currency_id: {
      type: Mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "currency",
    },
    members: [
      {
        type: Mongoose.Types.ObjectId,
        required: true,
        trim: true,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Book = Mongoose.model("bookrecord", bookSchema);

module.exports = Book;
