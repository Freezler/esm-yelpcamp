declare module "CampgroundSchema" {
  import { Document, Model } from "mongoose";

  export interface ICampground extends Document {
    title: string;
    description: string;
    price: number;
    location: string;
    reviews: string[];
  }

  export const Campground: Model<ICampground>;
  export function getCampgroundById(id: string): Promise<ICampground>;
}