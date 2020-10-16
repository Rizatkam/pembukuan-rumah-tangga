const { clients } = require("../models");

const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

const add = async (req, res) => {
  try {
    const params = req.body;

    if (req.query.ok !== process.env.ADKEY) {
      return res.status(401).send({
        status: {
          code: 401,
          message: "invalid key, your access is unauthorized",
        },
      });
    }

    const duplicated = await clients.findOne({ email: params.email });

    if (duplicated) {
      return res.status(400).send({
        status: {
          code: 400,
          message: "client already registered",
        },
      });
    }

    // create apiKey dengan random string
    params.apiKey = await crypto.randomBytes(40).toString("hex").slice(0, 40);

    const data = await clients.create(params);

    return res.status(201).send({
      status: {
        code: 201,
        message: "CREATED",
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

module.exports = { add };
