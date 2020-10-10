const express = require("express");
const app = express.Router();

const { category } = require("../controllers");
const auth = require("../config/auth");

app.get("/", auth.userAuth, category.get_all);
app.post("/", auth.userAuth, category.create);
app.put("/:id", auth.userAuth, category.update_by_id);
app.delete("/:id", auth.userAuth, category.delete_by_id);

module.exports = app;
