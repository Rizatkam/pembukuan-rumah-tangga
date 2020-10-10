const express = require("express");
const app = express.Router();

const { balance } = require("../controllers");
const auth = require("../config/auth");

app.get("/:bid", auth.userAuth, balance.get_by_bookID);
app.post("/", auth.userAuth, balance.create);
app.put("/:id", auth.userAuth, balance.update_by_id);
app.delete("/:id", auth.userAuth, balance.delete_by_id);

module.exports = app;
