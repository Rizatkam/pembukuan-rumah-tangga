const mongoose = require("mongoose");

const mongoDB = (params) => {
  const user = process.env.MONGO_USER_N || params.user;
  const password = process.env.MONGO_USER_P || params.password;
  const dbName = process.env.MONGO_DBNAME || params.dbName;

  const connect = mongoose.connect(
    `mongodb+srv://${user}:${password}@firstcluster.ijwcq.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      console.log(err ? `${err}` : `Mongo: Connected`);
    }
  );

  return connect;
};

module.exports = mongoDB;
