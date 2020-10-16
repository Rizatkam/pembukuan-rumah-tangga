const { budgets } = require("../models");

const adds = async (req, res) => {
  try {
    const params = req.body;

    const data = await budgets.create(params);

    return res.status(201).send({
      status: {
        code: 201,
        message: "budget has been inserted!",
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

const gets = async (req, res) => {
  try {
    const record_id = req.params.rid;

    const data = await budgets.find({ record_id }).populate("categories");

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
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};

const gets_by_id = async (req, res) => {
  try {
    const data = await budgets.findOne({ _id: req.params.id });

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

    await budgets.findByIdAndUpdate(
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

    await budgets.findByIdAndDelete(pid, (err) => {
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
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};
module.exports = { adds, gets, gets_by_id, updates, deletes };
