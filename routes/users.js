const express = require("express");
const app = express.Router();

const { users } = require("../controllers");
const auth = require("../config/auth");
const upload = require("../config/upload");
const storage = require("../config/storage");

app.post("/register", users.register);
app.post("/login", users.login);
app.post("/login-external", users.loginExternal);

app.get("/auth", auth.userAuth, users.tokenAuth); // for re-auth after reload
app.get("/logout", auth.userAuth, users.logout);
app.put("/:id", auth.userAuth, upload("avatar"), storage.google, users.update);
app.get("/:id", auth.userAuth, users.gets_by_id);

module.exports = app;
