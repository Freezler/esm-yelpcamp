import mongoose, { Document, Schema } from "mongoose";

export interface ICampground extends Document {
  title: String;
  price: Number;
  description: string;
  location: string;
  image: string;
}

const CampgroundSchema = new Schema<ICampground>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: {
    type: String, required: true
  },
  location: { type: String, required: true },
  image: { type: String }
});

export const Campground = mongoose.model<ICampground>("Campground", CampgroundSchema);

export default Campground;