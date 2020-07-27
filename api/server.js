const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../routes/auth/auth-router.js");
const recipesRouter = require("../routes/recipes/recipes-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
// server.use("/api/recipes", recipesRouter);

server.get("/", (req, res) =>{
  res.json({ api: "up"});
});

module.exports = server; 