const express = require("express");
const app = express.Router();

const { categories } = require("../controllers");
const auth = require("../config/auth");

app.get("/:id", auth.userAuth, categories.gets);
app.post("/", auth.userAuth, categories.adds);
app.put("/:id", auth.userAuth, categories.updates);
app.delete("/:id", auth.userAuth, categories.deletes);

module.exports = app;
