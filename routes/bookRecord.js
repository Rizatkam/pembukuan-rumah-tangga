const express = require("express");
const app = express.Router();

const { bookRecord } = require("../controllers");
const auth = require("../config/auth");

app.get("/:uid", auth.userAuth, bookRecord.get_book);
app.post("/", auth.userAuth, bookRecord.create);
app.put("/:id", auth.userAuth, bookRecord.update_by_id);
app.delete("/:id", auth.userAuth, bookRecord.delete_by_id);

module.exports = app;
