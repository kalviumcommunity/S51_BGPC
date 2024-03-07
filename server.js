const express = require("express");
require("dotenv").config()
// const mongoose = require("mongoose");
const { startDB, stopDB, isConnected } = require("./db.js");
const app = express();
const route = require("./router/routes.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(cookieParser());
app.use(express.json());
app.use("/", route);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send(isConnected() ? "Connected" : "Disconnected");
});

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.post("/login", (req, res) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      throw new Error("Username is required");
    }
    const secret = process.env.SECRET;
    const token = jwt.sign({ userName: userName }, secret, {
      expiresIn: "12h",
    });
    res.cookie("userToken", token);
    res.send("Login successful");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/logout", (req, res) => {
  try {
    res.clearCookie("userToken");
    res.send("Logout successful");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});


if (require.main == module) {
  app.listen(3000, async () => {
    await startDB();
    console.log("Server is running on port 3000");
  });
}
