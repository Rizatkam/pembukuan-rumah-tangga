const express = require("express");
const app = express.Router();

const { currencies } = require("../controllers");
const auth = require("../config/auth");

app.get("/", auth.userAuth, currencies.gets);

module.exports = app;
