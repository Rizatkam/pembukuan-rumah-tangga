const { transactions, balance, categories } = require("../models");

const adds = async (req, res) => {
  try {
    const params = req.body;

    const duplicatebalance = await balance.findOne({
      record_id: params.record_id,
      wallet_id: params.wallet_id,
    });

    if (!duplicatebalance) {
      const duplicated = await transactions.findOne({
        record_id: params.record_id,
        wallet_id: params.wallet_id,
        category_id: params.category_id,
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

      const data = await transactions.create(params);

      const dataBalance = await balance.create({
        record_id: params.record_id,
        wallet_id: params.wallet_id,
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
      const duplicated = await transactions.findOne({
        record_id: params.record_id,
        wallet_id: params.wallet_id,
        category_id: params.category_id,
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

      const dataCategory = await categories.findOne({
        _id: params.category_id,
      });

      if (dataCategory.type === "expense") {
        params.amount = -req.body.amount;
      }

      const data = await transactions.create(params);

      const dataBalance = await balance.findOneAndUpdate(
        {
          record_id: params.record_id,
          wallet_id: params.wallet_id,
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
    console.log(err);
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};

const gets_by_date = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const params = req.query;
    const record_id = req.params.bid;

    const data = await transactions
      .find({
        record_id,
        date: { $gte: params.from, $lte: params.to },
      })
      .populate("records")
      .populate("wallets")
      .populate("categories")
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
    console.log(err);
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};

const updates = async (req, res) => {
  try {
    const params = req.body;
    const pid = req.params.id;

    await transactions.findByIdAndUpdate(
      pid,
      params,
      { new: true },
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
            data: result,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};

const deletes = async (req, res) => {
  try {
    const pid = req.params.id;

    await transactions.findByIdAndDelete(pid, (err) => {
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
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};

module.exports = { adds, gets_by_date, updates, deletes };
