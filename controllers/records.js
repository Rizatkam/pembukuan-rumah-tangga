const { records, users } = require("../models");
const nodemailer = require("nodemailer");

const adds = async (req, res) => {
  try {
    const params = req.body;
    const data = await records.create(params);

    return res.status(201).send({
      status: {
        code: 201,
        message: "Record has been inserted!",
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
    const puid = req.params.uid; // users id

    const data = await records.find({
      members: { $elemMatch: { user_id: puid } },
    });

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

const gets_by_id = async (req, res) => {
  try {
    const prid = req.params.rid; // records id

    const data = await records.findOne({ _id: prid });

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

    await records.findByIdAndUpdate(
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

    await records.findByIdAndDelete(pid, (err) => {
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

const update_members = async (req, res) => {
  try {
    const params = req.body;
    //req.params.id;

    const data = await records.findOne({ _id: req.params.id });

    const user = await users.findOne({ email: params.email });

    if (!user) {
      // set member email if user already as a member or set to null
      // block if user already invite

      const invite = data.members.find((val) => val.user_id === params.email)
        ? data.members.find((val) => val.user_id === params.email).user_id
        : null;

      if (invite === params.email) {
        return res.status(400).send({
          status: {
            code: 400,
            message: "user already invite!",
          },
        });
      }

      /**
        add code to send email invititation to register into our apps
        ...
        ...
       */

      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      const testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
      /** end service mail */

      const mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: params.email,
        subject: `${params.invite_by} send invitation to manage financials`,
        html: "<h1>Welcome</h1><p>That was easy!</p>",
      };

      await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }
      });

      data.members.push({
        user_id: params.email,
        status: "pending",
        avatar: "",
      });
      data.save();

      return res.status(200).send({
        status: {
          code: 200,
          message: "OK",
        },
        data,
      });
    } else {
      // set member string id if user already as a member or set to null
      // block if user already join

      const member = data.members.find(
        (val) => val.user_id === user._id.toString()
      )
        ? data.members.find((val) => val.user_id === user._id.toString())
            .user_id
        : null;

      if (member === user._id.toString()) {
        return res.status(400).send({
          status: {
            code: 400,
            message: "user already join!",
          },
        });
      }

      data.members.push({
        user_id: user._id.toString(),
        status: "member",
        avatar: user.avatar,
      });
      data.save();

      return res.status(200).send({
        status: {
          code: 200,
          message: "OK",
        },
        data,
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

module.exports = { adds, gets, gets_by_id, updates, update_members, deletes };
