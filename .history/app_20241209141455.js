import express from "express";
import mongoose from "mongoose";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", "./views");

app.get("/", (req, res) => {
  res.send("Hello, Welcome to YelpCamp!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});