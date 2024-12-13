import mongoose, { Schema } from "mongoose";

const CampgroundSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number },
    description: { type: String, required: true, default: "No description provided." },
    location: { type: String, required: true, default: "No description provided." },
    image: { type: String }
});

const Campground = mongoose.model("Campground", CampgroundSchema);

export default Campground;
