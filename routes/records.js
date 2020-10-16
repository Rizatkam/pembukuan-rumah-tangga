const express = require("express");
const app = express.Router();

const { records } = require("../controllers");
const auth = require("../config/auth");

app.get("/:uid/sync", auth.userAuth, records.gets);
app.get("/:rid", auth.userAuth, records.gets_by_id);
app.post("/", auth.userAuth, records.adds);
app.put("/:id", auth.userAuth, records.updates);
app.put("/:id/add-member", auth.userAuth, records.update_members);
app.delete("/:id", auth.userAuth, records.deletes);

module.exports = app;
