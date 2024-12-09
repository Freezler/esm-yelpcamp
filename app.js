import express from "express";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Campground from "./models/campground.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

mongoose.connect("mongodb://localhost:27017/yelp-camp"), {

}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/makecampground", async (req, res) => {
  const camp = new Campground({
    title: "My Backyard", image: "https://source.unsplash.com/collection/483251", description: "cheap camping", price: 20
  });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});