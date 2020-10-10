const express = require("express");
const app = express.Router();

const { transaction } = require("../controllers");
const auth = require("../config/auth");

app.get("/:bid", auth.userAuth, transaction.get_by_date);
app.post("/", auth.userAuth, transaction.create);
app.put("/:id", auth.userAuth, transaction.update_by_id);
app.delete("/:id", auth.userAuth, transaction.delete_by_id);

module.exports = app;
