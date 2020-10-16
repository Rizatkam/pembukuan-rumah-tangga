const express = require("express");
const app = express.Router();

const { transactions } = require("../controllers");
const auth = require("../config/auth");

app.get("/:bid", auth.userAuth, transactions.gets_by_date);
app.post("/", auth.userAuth, transactions.adds);
app.put("/:id", auth.userAuth, transactions.updates);
app.delete("/:id", auth.userAuth, transactions.deletes);

module.exports = app;
