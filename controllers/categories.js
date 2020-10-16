const { categories } = require("../models");

const adds = async (req, res) => {
  try {
    const params = req.body;

    const data = await categories.create(params);

    return res.status(201).send({
      status: {
        code: 201,
        message: "Category has been inserted!",
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

const gets = async (req, res) => {
  try {
    const data = await categories.find({ record_id: req.params.id });

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

    await categories.findByIdAndUpdate(
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

    await categories.findByIdAndDelete(pid, (err) => {
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
