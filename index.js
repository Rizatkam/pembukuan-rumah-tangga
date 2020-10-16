const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const dotenv = require("dotenv");
const mongoDB = require("./config/mongoose");
const auth = require("./config/auth");

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
  "https://perfirec.netlify.app",
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

app.get("/", auth.accessAuth, (req, res) => {
  res.status(200).send({
    message: "Server runing...",
  });
});

app.use("/api/origin", routes.clients); // create access key for origin
app.use("/api/v1/users", auth.accessAuth, routes.users);
app.use("/api/v1/currencies", auth.accessAuth, routes.currencies);
app.use("/api/v1/records", auth.accessAuth, routes.records);
app.use("/api/v1/balance", auth.accessAuth, routes.balance);
app.use("/api/v1/categories", auth.accessAuth, routes.categories);
app.use("/api/v1/wallets", auth.accessAuth, routes.wallets);
app.use("/api/v1/transactions", auth.accessAuth, routes.transactions);
app.use("/api/v1/budgets", auth.accessAuth, routes.budgets);

app.listen(port, () => console.log(`listening at port:${port}`));
