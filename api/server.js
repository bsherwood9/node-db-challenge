const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const projectRouter = require("../routes/router.js");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/api", projectRouter);

module.exports = server;
