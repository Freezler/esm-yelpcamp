import { Document, Model } from "mongoose";

const now = new Date();
const amsterdamOffset = 2; // CET is UTC+1
export const amsterdamTime = new Date(now.setHours(now.getUTCHours() + amsterdamOffset));

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