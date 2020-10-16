const { users, records } = require("../models");

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const firebaseApp = require("../config/firebase");

dotenv.config();
const bucket = firebaseApp.storage().bucket();

const sign_token = {
  issuer: process.env.ISSUER,
  subject: process.env.SUBJECT,
  algorithm: process.env.ALGORITHM,
  audience: process.env.AUDIENCE,
  expiresIn: process.env.DEFAULT_EXP,
};

const tokenAuth = async (req, res) => {
  try {
    const data = await jwt.verify(
      req.headers.authorization,
      process.env.SECRET,
      sign_token
    );

    const user = await users.findOne({ email: data.email });

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

    return res.status(200).send({
      status: {
        code: 200,
        message: "OK",
      },
      data: {
        user: {
          id: user._id,
          namer: user.name,
          nameu: user.username,
          email: user.email,
          dateOfBirth: user.dateOfBirth ? user.dateOfBirth : "",
        },
        googleAccount: {
          account: user.googleAccount.account,
          linked: user.googleAccount.linked,
        },
        facebookAccount: {
          account: user.facebookAccount.account,
          linked: user.facebookAccount.linked,
        },
        avatar: user.avatar,
        token: user.token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      status: {
        code: 401,
        message: err.message,
      },
    });
  }
};

const register = async (req, res) => {
  try {
    const params = req.body;

    // check username, if exist then block it.
    const duplicated = await users.findOne({ username: params.username });

    if (duplicated) {
      return res.status(400).send({
        status: {
          code: 400,
          message: "username telah terpakai!",
        },
      });
    }

    // change params password with encrypted password
    params.password = await bcrypt.hashSync(req.body.password, 10);
    params.token = params.token
      ? params.token
      : (await "_") + Math.random().toString(36).substr(2, 9) + params.username;

    const data = await users.create(params);

    // find user register in our apps, if exist as member invite by other then update it.
    const record = await records.find({
      members: { $elemMatch: { user_id: data.email } },
    });

    if (record.length !== 0) {
      await records.updateMany(
        {
          members: { $elemMatch: { user_id: data.email } },
        },
        {
          $set: {
            "members.$.user_id": data._id.toString(),
            "members.$.status": "member",
          },
        },
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    return res.status(201).send({
      status: {
        code: 201,
        message: "CREATED",
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

const loginExternal = async (req, res) => {
  try {
    const params = req.body;

    const query = {
      $or: [
        {
          "googleAccount.account": params.account,
        },
        {
          "facebookAccount.account": params.account,
        },
      ],
    };

    const user = await users.findOne(query);

    if (!user) {
      return res.status(401).send({
        status: {
          code: 401,
          message: "invalid login, your access is unauthorized",
        },
      });
    }

    if (
      user.googleAccount.key === params.key ||
      user.facebookAccount.key === params.key
    ) {
      const userData = {
        name: user.name,
        email: user.email,
      };

      // generate token berdasarkan data user dari database
      const token = jwt.sign(userData, process.env.SECRET, sign_token);

      user.set({ token: token });
      user.save();

      return res.status(200).send({
        status: {
          code: 200,
          message: "OK",
        },
        data: {
          user: {
            id: user._id,
            namer: user.name,
            nameu: user.username,
            email: user.email,
            dateOfBirth: user.dateOfBirth ? user.dateOfBirth : "",
          },
          googleAccount: {
            account: user.googleAccount.account,
            linked: user.googleAccount.linked,
          },
          facebookAccount: {
            account: user.facebookAccount.account,
            linked: user.facebookAccount.linked,
          },
          avatar: user.avatar,
          token,
        },
      });
    } else {
      return res.status(401).send({
        status: {
          code: 401,
          message: "invalid login, your access is unauthorized",
        },
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

const login = async (req, res) => {
  try {
    const params = req.body;

    const user = await users.findOne({ username: params.username });

    if (!user) {
      return res.status(401).send({
        status: {
          code: 401,
          message: "invalid username / password",
        },
      });
    }

    const compare_password = bcrypt.compareSync(params.password, user.password);
    if (!compare_password) {
      return res.status(401).send({
        status: {
          code: 401,
          message: "invalid username / password",
        },
      });
    }

    const userData = {
      name: user.name,
      email: user.email,
    };

    // generate token berdasarkan data user dari database
    const token = jwt.sign(userData, process.env.SECRET, sign_token);

    user.set({ token: token });
    user.save();

    return res.status(200).send({
      status: {
        code: 200,
        message: "OK",
      },
      data: {
        user: {
          id: user._id,
          namer: user.name,
          nameu: user.username,
          email: user.email,
          dateOfBirth: user.dateOfBirth ? user.dateOfBirth : "",
        },
        googleAccount: {
          account: user.googleAccount.account,
          linked: user.googleAccount.linked,
        },
        facebookAccount: {
          account: user.facebookAccount.account,
          linked: user.facebookAccount.linked,
        },
        avatar: user.avatar,
        token,
      },
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

const logout = async (req, res) => {
  try {
    const data = await jwt.verify(
      req.headers.authorization,
      process.env.SECRET,
      sign_token
    );

    const user = await users.findOne({ email: data.email });

    if (!user) {
      return res.status(401).send({
        status: {
          code: 401,
          message: "invalid token, your access is unauthorized",
        },
      });
    }

    user.set({
      token: "_" + Math.random().toString(36).substr(2, 9) + user.username,
    });
    user.save();

    return res.status(200).send({
      status: {
        code: 200,
        message: "OK",
      },
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

const update = async (req, res) => {
  try {
    const params = { ...req.body };
    if (req.file && req.file.cloudStoragePublicUrl)
      params.avatar = req.file.cloudStoragePublicUrl;

    const data = await users.findOne({ _id: req.params.id });

    if (!data) {
      return res.status(400).send({
        status: {
          code: 400,
          message: "data not found",
        },
      });
    }

    if (data.avatar !== "") {
      const filename = data.avatar.replace(
        `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/`,
        ""
      );

      const oldfile = bucket.file(filename);

      if (!oldfile) {
        return res.status(400).send({
          status: {
            code: 400,
            message: "there is no files in the storage",
          },
        });
      }

      await oldfile.delete();
    }

    if (params.password) {
      params.password = await bcrypt.hashSync(req.body.password, 10);
    }

    data.set(params);
    data.save();

    return res.status(200).send({
      status: {
        code: 200,
        message: "OK",
      },
      data: {
        user: {
          id: data._id,
          namer: data.name,
          nameu: data.username,
          email: data.email,
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth : "",
        },
        googleAccount: {
          account: data.googleAccount.account,
          linked: data.googleAccount.linked,
        },
        facebookAccount: {
          account: data.facebookAccount.account,
          linked: data.facebookAccount.linked,
        },
        avatar: data.avatar,
        token: data.token,
      },
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

const gets_by_id = async (req, res) => {
  try {
    const data = await users.findOne({ _id: req.params.id });

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
      data: {
        id: data._id,
        namer: data.name,
        nameu: data.username,
        email: data.email,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth : "",
        avatar: data.avatar,
      },
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
  tokenAuth,
  register,
  loginExternal,
  login,
  logout,
  update,
  gets_by_id,
};
