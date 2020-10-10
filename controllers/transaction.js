const { transaction, balance, storage } = require("../models");

const create = async (req, res) => {
  try {
    const params = req.body;
    const duplicatebalance = await balance.findOne({
      book_id: params.bid,
      wallet_id: params.wid,
    });
    if (!duplicatebalance) {
      const duplicated = await transaction.findOne({
        book_id: params.bid,
        wallet_id: params.wid,
        category_id: params.cid,
        date: params.date,
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
      const data = await transaction.create(params);
      const dataBalance = await balance.create({
        book_id: params.bid,
        wallet_id: params.wid,
        balance: params.amount,
      });
      return res.status(201).send({
        status: {
          code: 201,
          message: "Transaction success!",
        },
        data,
        dataBalance,
      });
    } else {
      const duplicated = await transaction.findOne({
        book_id: params.bid,
        wallet_id: params.wid,
        category_id: params.cid,
        date: params.date,
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
      const data = await transaction.create(params);
      const dataBalance = await balance.findOneAndUpdate(
        {
          book_id: params.bid,
          wallet_id: params.wid,
        },
        { balance: duplicatebalance.balance + params.amount }
      );
      return res.status(201).send({
        status: {
          code: 201,
          message: "Transaction success!",
        },
        data,
        dataBalance,
      });
    }
  } catch (err) {
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};
const get_by_date = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const params = req.query;
    const book_id = req.params.bid;
    const data = await transaction
      .find({
        book_id,
        date: { $gte: params.from, $lte: params.to },
      })
      .populate("book_id")
      .populate("wallet_id")
      .populate("category_id")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ date: -1 })
      .exec();

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
    const data = await transaction.findByIdAndUpdate(
      pid,
      params,
      (err, result) => {
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
      }
    );
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
    const data = await transaction.findByIdAndDelete(pid, (err) => {
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
module.exports = { create, get_by_date, update_by_id, delete_by_id };
