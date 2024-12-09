import mongoose from "mongoose";
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  location: String
});

export default mongoose.model("Campground", campgroundSchema);