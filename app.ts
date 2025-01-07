import ejsMate from "ejs-mate";
import express, { Application, NextFunction, Request, Response } from "express";
import methodOverride from "method-override";
import mongoose from "mongoose";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Campground } from "./models/campground.ts";
import Review from "./models/review.ts";
import { campgroundSchema, reviewSchema } from "./schemas.ts";
import catchAsync from "./utils/catchAsync.ts";
import { ExpressError } from './utils/ExpressError.ts';
import { detectLanguages } from "./utils/languageDetection.ts";

const app: Application = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const myMiddleware = (req: Request, res: Response, next: NextFunction) => {
	console.log("This is my middleware!");
	next();
};

app.use(myMiddleware);
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan('tiny'));
app.use(express.json());

const validateReview = (req: Request, res: Response, next: NextFunction) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

const validateCampground = (req: Request, res: Response, next: NextFunction) => {
	const { error } = campgroundSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/yelp-camp")
	.then(() => console.log("Database connected"))
	.catch(err => console.error("Database connection error:", err));

const verifyPassword = (req: Request, res: Response, next: NextFunction) => {
	if (req.query.password === 'chickennugget') {
		return next();
	}
	res.send('Sorry, you need a password dummy');
}

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(function (req: Request, res: Response, next: NextFunction) {
	console.log(`${req.method} Request gemaakt vanaf ${req.protocol}//${req.hostname}:${port}${req.originalUrl} op ${new Date().toLocaleDateString('nl-NL', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} om ${new Date().toLocaleTimeString('nl-NL')}`);
	return next();
});

app.get("/", (req: Request, res: Response) => {
	res.render("home");
});

app.get('/dogs', (req: Request, res: Response) => {
	res.send('WOOF WOOF')
})

app.get("/secret", verifyPassword, (req: Request, res: Response) => {
	res.send('My Super secret secrets!')
});

app.get("/error", (req: Request, res: Response) => {
	console.log('Forcing an error');
	throw new Error('This is a forced error');
});

app.get("/campgrounds", catchAsync(async (req: Request, res: Response) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index', { campgrounds })
}));

app.get("/campgrounds/new", (req: Request, res: Response) => {
	res.render('campgrounds/new')
});

app.post('/campgrounds', validateCampground, catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const campground = new Campground({
		...req.body.campground
	});
	await campground.save();
	res.redirect(`/campgrounds/${campground._id}`);
}));

app.post('/detect-language', (req: Request, res: Response) => {
	const input = req.body.text;
	const result = detectLanguages(input);
	res.json(result);
});

app.get("/campgrounds/search", catchAsync(async (req: Request, res: Response) => {
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

app.get("/campgrounds/:id", catchAsync(async (req: Request, res: Response) => {
	const campground = await Campground.findById(req.params.id).populate('reviews');
	res.render('campgrounds/show', { campground });
}));

app.get('/campgrounds/:id/edit', catchAsync(async (req: Request, res: Response) => {
	const campground = await Campground.findById(req.params.id)
	res.render('campgrounds/edit', { campground })
}));

app.put('/campgrounds/:id', validateCampground, catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
	if (!campground) {
		return res.status(404).send("Campground not found");
	}
	res.redirect(`/campgrounds/${campground._id}`);
}));

app.delete('/campgrounds/:id', catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	await Campground.findByIdAndDelete(id);
	res.redirect('/campgrounds');
}));

app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req: Request, res: Response) => {
	const campground: any = await Campground.findById(req.params.id);
	const review = new Review(req.body.review);
	campground.reviews.push(review);
	await review.save();
	await campground.save();
	res.redirect(`/campgrounds/${campground._id}`);
}));

app.all('*', (req: Request, res: Response, next: NextFunction) => {
	next(new ExpressError('Page not found', 404));
});

app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Something went wrong';
	console.error(`****************ERROR******************`);
	console.error(`Status Code: ${statusCode}, Message: ${err.message}`);
	console.error(`****************ERROR******************`);
	res.status(statusCode).render('error', { err });
});

app.listen(port, () => {
	console.log(`Server started on port ${process.env.PORT || 3000}`);
});