const express = require("express");
const app = express.Router();

const { clients } = require("../controllers");

app.post("/add?:ok", clients.add);

module.exports = app;
