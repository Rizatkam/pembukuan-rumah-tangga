const { balance } = require("../models");

const create = async (req, res) => {
  try {
    const params = req.body;
    const duplicated = await balance.findOne({
      book_id: params.bid,
      wallet_id: params.wid,
    });

    if (duplicated) {
      return res.status(400).send({
        status: {
          code: 400,
          message:
            "This transaction has been inputted.Do you want to update it?",
        },
      });
    }
    const data = await balance.create(params);

    return res.status(201).send({
      status: {
        code: 201,
        message: "balance has been inserted!",
      },
      data,
    });
  } catch (err) {
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};

const get_by_bookID = async (req, res) => {
  try {
    const book_id = req.params.bid;
    const data = await balance.find({ book_id }).populate("wallet_id");

    if (!data) {
      return res.status(400).send({
        status: {
          code: 400,
          message: "Data not found!",
        },
      });
    }

    return res.status(200).send({
      status: {
        code: 200,
        message: "OK",
      },
      data,
    });
  } catch (err) {
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};
const update_by_id = async (req, res) => {
  try {
    const params = req.body;
    const pid = req.params.id;
    const data = await balance.findByIdAndUpdate(pid, params, (err, result) => {
      if (err) {
        res.status(400).send({
          status: {
            code: 400,
            message: err.message,
          },
        });
      } else {
        res.status(200).send({
          status: {
            code: 200,
            message: "OK",
          },
          result,
        });
      }
    });
    return res.status(200).send({
      status: {
        code: 200,
        message: "OK",
      },
      data,
    });
  } catch (err) {
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};
const delete_by_id = async (req, res) => {
  try {
    const pid = req.params.id;
    const data = await balance.findByIdAndDelete(pid, (err) => {
      if (err) {
        res.status(400).send({
          status: {
            code: 400,
            message: err.message,
          },
        });
      } else {
        res.status(200).send({
          status: {
            code: 200,
            message: "OK",
          },
        });
      }
    });
    return res.status(200).send({
      status: {
        code: 200,
        message: "OK",
      },
      data,
    });
  } catch (err) {
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};
module.exports = { create, get_by_bookID, update_by_id, delete_by_id };
