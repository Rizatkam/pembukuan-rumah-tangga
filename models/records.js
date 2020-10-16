const Mongoose = require("mongoose");

const recordSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    currency_id: {
      type: String,
      required: true,
    },
    members: [
      {
        type: Object,
        require: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Record = Mongoose.model("Record", recordSchema);

module.exports = Record;
