import mongoose from "mongoose";
import Campground from "../models/campground.js";
import cities from "./cities.js";
import { descriptors, places } from './seedHelpers.js';

mongoose.connect("mongodb://localhost:27017/yelp-camp", {

})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 50;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      price,
      image: `https://picsum.photos/600/400?random=${random1000}`,
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, quisquam fugit dolore non dolorum ad?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, quisquam fugit dolore non dolorum ad?`
    })
    await camp.save();
  };
}
console.log('Database seeded!');


seedDB().then(() => {
  mongoose.connection.close();
  console.log(`database connection closed after seeding!`)
})