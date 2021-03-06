const { balance } = require("../models");

const adds = async (req, res) => {
  try {
    const params = req.body;

    const duplicated = await balance.findOne({
      record_id: params.record_id,
      wallet_id: params.wallet_id,
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
    console.log(err);
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};

const gets_by_record = async (req, res) => {
  try {
    const record_id = req.params.id;

    const data = await balance.find({ record_id }).populate("wallets");

    if (!data) {
      return res.status(400).send({
        status: {
          code: 400,
          message: "data not found!",
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

    await balance.findByIdAndUpdate(
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

    await balance.findByIdAndDelete(pid, (err) => {
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

module.exports = {
  adds,
  gets_by_record,
  updates,
  deletes,
};
