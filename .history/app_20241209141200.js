import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, Welcome to YelpCamp!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});