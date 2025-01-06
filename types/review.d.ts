import { Document, Model } from "mongoose";

export interface IReview extends Document {
    rating: number;
    body: string;
    author: {
        _id: string;
        username: string;
    };
    createdAt: Date;
}

export const Review: Model<IReview>;