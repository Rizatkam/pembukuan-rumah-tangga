const express = require("express");
const app = express.Router();

const { budgets } = require("../controllers");
const auth = require("../config/auth");

app.get("/:rid/sync", auth.userAuth, budgets.gets);
app.get("/:id", auth.userAuth, budgets.gets_by_id);
app.post("/", auth.userAuth, budgets.adds);
app.put("/:id", auth.userAuth, budgets.updates);
app.delete("/:id", auth.userAuth, budgets.deletes);

module.exports = app;
