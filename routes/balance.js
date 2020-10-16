const express = require("express");
const app = express.Router();

const { balance } = require("../controllers");
const auth = require("../config/auth");

app.get("/:id", auth.userAuth, balance.gets_by_record);
app.post("/", auth.userAuth, balance.adds);
app.put("/:id", auth.userAuth, balance.updates);
app.delete("/:id", auth.userAuth, balance.deletes);

module.exports = app;
