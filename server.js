const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = require("./router");
require("dotenv").config();
const bodyParser = require("body-parser");

const SECRET = process.env.SECRET;
const PORT = 3000;

const server = express();
server.use(cookieParser());
server.use(express.urlencoded());
server.use(bodyParser.json());

server.use(express.static("public"));

server.use(router);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
