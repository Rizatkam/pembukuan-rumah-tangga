const { wallets, balance } = require("../models");

const adds = async (req, res) => {
  try {
    const params = req.body;

    const data = await wallets.create({
      record_id: params.record_id,
      name: params.name,
    });

    if (!data) {
      return res.status(400).send({
        status: {
          code: 400,
          message: "failed to add wallet!",
        },
      });
    } else {
      const dataBalance = await balance.create({
        record_id: params.record_id,
        wallet_id: data._id,
        balance: params.balance,
      });

      return res.status(201).send({
        status: {
          code: 201,
          message: "wallet has been inserted!",
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

const gets = async (req, res) => {
  try {
    const data = await wallets.find({ record_id: req.params.id });

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

    const data = await wallets.findOne({ _id: req.params.id });

    if (!data) {
      return res.status(400).send({
        status: {
          code: 400,
          message: "data not found",
        },
      });
    }

    if (params.balance) {
      const dataBalance = await balance.findOne({ wallet_id: req.params.id });

      dataBalance.set({ balance: params.balance });
      dataBalance.save();
    }

    if (params.name) {
      data.set({ name: params.name });
      data.save();
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

const deletes = async (req, res) => {
  try {
    const pid = req.params.id;

    await wallets.findByIdAndDelete(pid, (err) => {
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

module.exports = { adds, gets, updates, deletes };
