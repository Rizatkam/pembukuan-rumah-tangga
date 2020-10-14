const { bookRecord } = require("../models");

const create = async (req, res) => {
  try {
    const params = req.body;
    const data = await bookRecord.create(params);

    return res.status(201).send({
      status: {
        code: 201,
        message: "Book Record has been inserted!",
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

const get_book = async (req, res) => {
  try {
    const puid = req.params.uid;
    const data = await bookRecord
      .find({
        members: { $elemMatch: `/${puid}/` },
      })
      .populate("currency_id");

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
    const data = await bookRecord.findByIdAndUpdate(
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
    const data = await bookRecord.findByIdAndDelete(pid, (err) => {
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
const add_members = async (req, res) => {
  try {
    const params = req.body;
    const pid = req.params.id;
    const oldData = await bookRecord.findById(pid);
    const newData = await bookRecord.findByIdAndUpdate(pid, {
      members: oldData.members.push(params.user_id),
    });
    return res.status(200).send({
      status: {
        code: 200,
        message: "OK",
      },
      newData,
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
const kick_members = async (req, res) => {
  try {
    const params = req.body;
    const pid = req.params.id;
    const oldData = await bookRecord.findById(pid);
    const index = oldData.members.indexOf(params.user_id);
    if (index > -1) {
      const newData = await bookRecord.findByIdAndUpdate(pid, {
        members: oldData.members.splice(index, 1),
      });
      return res.status(200).send({
        status: {
          code: 200,
          message: "OK",
        },
        newData,
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
module.exports = {
  create,
  get_book,
  update_by_id,
  delete_by_id,
  add_members,
  kick_members,
};
