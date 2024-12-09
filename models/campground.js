import mongoose from "mongoose";
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
  title: { type: String, required: false },
  image: { type: String, required: false},
  price: { type: Number, required: false },
  description: { type: String, required: false},
  location: String
});

export default mongoose.model("Campground", campgroundSchema);