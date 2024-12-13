import mongoose from "mongoose";
import { Campground } from "../models/campground.js";
import cities from "./cities.js";
import { places, descriptors } from './seedHelpers.js';

mongoose.connect("mongodb://localhost:27017/yelp-camp", {

})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array: any) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`
    });
    await camp.save();
  }
  console.log('Database seeded!');
}

seedDB().then(() => {
  mongoose.connection.close();
  console.log(`database connection closed after seeding!`)
})