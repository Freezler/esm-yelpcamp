import mongoose, { Document, Schema } from "mongoose";

export interface ICampground extends Document {
  title: string;
  price: number;
  description: string;
  location: string;
  image: string;
  reviews: mongoose.Types.ObjectId[];
  createdOn: Date;
}

const CampgroundSchema = new Schema<ICampground>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    },
  ]

}, { timestamps: { createdAt: 'createdOn' } });
export const Campground = mongoose.model<ICampground>("Campground", CampgroundSchema);

export default Campground;