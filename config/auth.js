const { users, clients } = require("../models");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

let sign_token = {
  issuer: process.env.ISSUER,
  subject: process.env.SUBJECT,
  algorithm: process.env.ALGORITHM,
  audience: process.env.AUDIENCE,
};

const accessAuth = async (req, res, next) => {
  try {
    const client = await clients.findOne({ apiKey: req.query.ok });

    if (!client) {
      return res.status(401).send({
        status: {
          code: 401,
          message: "invalid key, your access is unauthorized",
        },
      });
    }

    return next();
  } catch (err) {
    return res.status(401).send({
      status: {
        code: 401,
        message: "invalid key, your access is unauthorized",
      },
    });
  }
};

const userAuth = async (req, res, next) => {
  try {
    sign_token = { ...sign_token, expiresIn: process.env.DEFAULT_EXP };

    const data = await jwt.verify(
      req.headers.authorization,
      process.env.SECRET,
      sign_token
    );

    //console.log(data.username, "data from decoded userAuth middleware");
    const query = {
      email: data.email,
    };

    const user = await users.findOne(query);

    //data.exp = 1602565109, Date.now() = 1602483047232;
    if (Date.now() >= data.exp * 1000) {
      user.set({
        token: "_" + Math.random().toString(36).substr(2, 9) + user.username,
      });
      user.save();

      return res.status(401).send({
        status: {
          code: 401,
          message: "your token expired",
        },
      });
    }

    if (!user) {
      return res.status(401).send({
        status: {
          code: 401,
          message: "invalid token, your access is unauthorized",
        },
      });
    }

    if (user.token !== req.headers.authorization) {
      return res.status(401).send({
        status: {
          code: 401,
          message: "invalid token, your access is unauthorized",
        },
      });
    }

    return next();
  } catch (err) {
    return res.status(401).send({
      status: {
        code: 401,
        message: "invalid token, your access is unauthorized",
      },
    });
  }
};

module.exports = { accessAuth, userAuth };
