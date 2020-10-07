const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Users = require("../models/users");

dotenv.config();

let sign_token = {
  issuer: process.env.ISSUER,
  subject: process.env.SUBJECT,
  algorithm: process.env.ALGORITHM,
  audience: process.env.AUDIENCE,
};

const userAuth = async (req, res, next) => {
  try {
    sign_token = { ...sign_token, expiresIn: process.env.DEFAULT_EXP };

    const data = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      sign_token
    );

    //console.log(data.username, "data from decoded userAuth middleware");
    const query = {
      username: data.nameu,
    };

    const user = await Users.findOne(query);

    if (!user) {
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

module.exports = { userAuth };
