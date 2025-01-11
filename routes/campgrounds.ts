import express, { NextFunction, Request, Response, Router } from 'express';
import { Campground } from '../models/campground.ts';
import { campgroundSchema } from '../schemas.ts';
import catchAsync from '../utils/catchAsync.ts';
import { ExpressError } from '../utils/ExpressError.ts';

const router: Router = express.Router({ mergeParams: true });
const validateCampground = (req: Request, res: Response, next: NextFunction) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.get("/", catchAsync(async (req: Request, res: Response) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}));
router.get("/new", (req: Request, res: Response) => {
    res.render('campgrounds/new')
});
router.post('/', validateCampground, catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const campground = new Campground({
        ...req.body.campground
    });
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));


router.get("/search", catchAsync(async (req: Request, res: Response) => {
    const searchQuery = req.query.searchQuery;
    try {
        let campgrounds;
        if (searchQuery) {
            campgrounds = await Campground.find({
                $or: [
                    { title: { $regex: searchQuery as string, $options: 'i' } },
                    { description: { $regex: searchQuery as string, $options: 'i' } }
                ]
            });
        } else {
            campgrounds = await Campground.find({});
        }
        res.render('campgrounds/index', { campgrounds });
    } catch (e) {
        console.error(e);
        res.redirect('/campgrounds');
    }
}));

router.get("/:id", catchAsync(async (req: Request, res: Response) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', { campground });
}));

router.get('/:id/edit', catchAsync(async (req: Request, res: Response) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground })
}));

router.put('/:id', validateCampground, catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    if (!campground) {
        return res.status(404).send("Campground not found");
    }
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

export default router;