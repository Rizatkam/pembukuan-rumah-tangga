const express = require("express");
const app = express.Router();

const { users } = require("../controllers");
const auth = require("../config/auth");

app.get("/auth", auth.userAuth, users.tokenAuth);
app.post("/registerauth", users.registerWithExternalDataThenLogin);
app.post("/register", users.register);
app.post("/login", users.login);
app.get("/logout", auth.userAuth, users.logout);
app.get("/sync", auth.userAuth, users.get_user_for_contact);
app.get("/contact", auth.userAuth, users.get_user_for_contact_by_uname);
app.put("/:id", auth.userAuth, users.edit_user);
// app.get("/:id", users.get_by_id)

module.exports = app;
