import express, { NextFunction, Request, Response, Router } from 'express';
import { Campground } from '../models/campground.ts';
import { Review } from '../models/review.ts';
import { reviewSchema } from "../schemas.ts";
import catchAsync from '../utils/catchAsync.ts';
import { ExpressError } from '../utils/ExpressError.ts';

const router: Router = express.Router({ mergeParams: true });
const validateReview = (req: Request, res: Response, next: NextFunction) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

router.post('/', validateReview, catchAsync(async (req: Request, res: Response) => {
    const campground: any = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully added a new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:reviewId', catchAsync(async (req: Request, res: Response) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}))

export default router;