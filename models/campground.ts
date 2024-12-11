import mongoose, { Schema, Document } from "mongoose";

export interface Campground extends Document {
  title: string;
  price: number;
  description: string;
  location: string;
}

const CampgroundSchema = new Schema<Campground>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true }
});

export const Campground = mongoose.model<Campground>("Campground", CampgroundSchema);
