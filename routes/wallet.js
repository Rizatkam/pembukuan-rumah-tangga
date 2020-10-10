const express = require("express");
const app = express.Router();

const { wallet } = require("../controllers");
const auth = require("../config/auth");

app.get("/", auth.userAuth, wallet.get_all);
app.post("/", auth.userAuth, wallet.create);
app.put("/:id", auth.userAuth, wallet.update_by_id);
app.delete("/:id", auth.userAuth, wallet.delete_by_id);

module.exports = app;
