import express from "express";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(import.meta.url);

const app = express();
app.set("view engine", "ejs");
app.set("views", path.);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, Welcome to YelpCamp!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});