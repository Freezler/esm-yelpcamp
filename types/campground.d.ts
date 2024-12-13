declare module "CampgroundSchema" {
  import { Model, Document } from "mongoose";

  export interface ICampground extends Document {
    title: string;
    description: string;
    price: number;
    location: string;
  }

  export const Campground: Model<ICampground>;
  export function getCampgroundById(id: string): Promise<ICampground>;
}