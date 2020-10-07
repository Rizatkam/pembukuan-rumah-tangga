const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const dotenv = require("dotenv");
const mongoDB = require("./config/mongoose");

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let whitelist = [
  "http://localhost",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://192.121.99.11:3000",
];
let corsOpt = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS!"));
    }
  },
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOpt));
mongoDB();

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server runing...",
  });
});

app.use("/api/v1/users", routes.users);
app.use("/api/v1/transaction", routes.transaction);
app.use("/api/v1/category", routes.category);
app.use("/api/v1/bookRecord", routes.bookRecord);
app.use("/api/v1/wallet", routes.wallet);
app.use("/api/v1/balance", routes.balance);
app.use("/api/v1/budget", routes.budget);
app.use("/api/v1/categoryType", routes.categoryType);
app.use("/api/v1/parrentCategory", routes.parrentCategory);
app.use("/api/v1/currency", routes.currency);

app.listen(port, () => console.log(`listening at port:${port}`));
