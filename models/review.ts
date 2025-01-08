import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number
});

export const Review = mongoose.model( 'Review', reviewSchema);

export default Review;
