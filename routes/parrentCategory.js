const express = require("express");
const app = express.Router();

const { parrentCategory } = require("../controllers");
const auth = require("../config/auth");

app.get("/", auth.userAuth, parrentCategory.get_all);
app.post("/", auth.userAuth, parrentCategory.create);
app.put("/:id", auth.userAuth, parrentCategory.update_by_id);
app.delete("/:id", auth.userAuth, parrentCategory.delete_by_id);

module.exports = app;
