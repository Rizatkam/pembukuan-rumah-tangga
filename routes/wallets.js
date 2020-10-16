const express = require("express");
const app = express.Router();

const { wallets } = require("../controllers");
const auth = require("../config/auth");

app.get("/:id", auth.userAuth, wallets.gets);
app.post("/", auth.userAuth, wallets.adds);
app.put("/:id", auth.userAuth, wallets.updates);
app.delete("/:id", auth.userAuth, wallets.deletes);

module.exports = app;
