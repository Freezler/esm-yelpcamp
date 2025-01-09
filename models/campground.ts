import mongoose, { Document, Schema } from "mongoose";
import Review from "./review.ts";

export interface ICampground extends Document {
  _id: mongoose.Types.ObjectId;
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

CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
})

export const Campground = mongoose.model<ICampground>("Campground", CampgroundSchema);


export default Campground;