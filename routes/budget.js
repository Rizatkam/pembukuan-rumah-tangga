const express = require("express");
const app = express.Router();

const { budget } = require("../controllers");
const auth = require("../config/auth");

app.get("/:bid", auth.userAuth, budget.get_by_bookID);
app.post("/", auth.userAuth, budget.create);
app.put("/:id", auth.userAuth, budget.update_by_id);
app.delete("/:id", auth.userAuth, budget.delete_by_id);

module.exports = app;
