
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router.js");
const recipesRouter = require("../recipes/recipes-router.js");

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/recipes", recipesRouter);

server.get("/", (req, res) =>{
  res.json({ api: "test running"});
});

module.exports = server;