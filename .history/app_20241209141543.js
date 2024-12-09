import express from "express";
import mongoose from "mongoose";
import path, { dirname } from "path";
const __dirname = dirname(import.meta.url);


const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, Welcome to YelpCamp!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});