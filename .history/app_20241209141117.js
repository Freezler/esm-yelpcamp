import express from "express";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Welocme to YelpCamp!");
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});