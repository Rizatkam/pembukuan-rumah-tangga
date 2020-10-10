const express = require("express");
const app = express.Router();

const { categoryType } = require("../controllers");
const auth = require("../config/auth");

app.get("/", auth.userAuth, categoryType.get_all);
app.post("/", auth.userAuth, categoryType.create);
app.put("/:id", auth.userAuth, categoryType.update_by_id);
app.delete("/:id", auth.userAuth, categoryType.delete_by_id);

module.exports = app;
