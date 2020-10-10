const express = require("express");
const app = express.Router();

const { currency } = require("../controllers");
const auth = require("../config/auth");

app.get("/", auth.userAuth, currency.get_all);
app.post("/", auth.userAuth, currency.create);
app.put("/:id", auth.userAuth, currency.update_by_id);
app.delete("/:id", auth.userAuth, currency.delete_by_id);

module.exports = app;
