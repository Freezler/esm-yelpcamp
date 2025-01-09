import path, { dirname } from "path";
import { fileURLToPath } from "url";
import crypto from 'crypto';

import express, { Application, NextFunction, Request, Response } from "express";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import Session from "express-session";
import mongoose from "mongoose";
import morgan from "morgan";

import campgrounds from "./routes/campgrounds.ts";
import reviews from "./routes/reviews.ts";

import { ExpressError } from "./utils/ExpressError.ts";

const app: Application = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/yelp-camp")
	.then(() => console.log("Database connected"))
	.catch(err => console.error("Database connection error:", err));

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));


// const sessionConfig: Session = {
// 	secret: 'thisshouldbeabettersecret!',
// 	resave: false,
// 	saveUninitialized: true,
// 	cookie: {
// 		httpOnly: true,
// 		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
// 		maxAge: 1000 * 60 * 60 * 24 * 7
// 	}
// }

const secretKey = crypto.randomBytes(32);
const sessionSecret = crypto.createHmac('sha256', secretKey).update('secure-session-secret').digest('hex');

const sessionOptions = {
	secret: sessionSecret,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
};

app.use(Session(sessionOptions));

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", (req: Request, res: Response) => {
	res.render("home");
});

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