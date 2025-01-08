import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express, { Application, NextFunction, Request, Response } from "express";
import methodOverride from "method-override";
import mongoose from "mongoose";
import morgan from "morgan";
import ejsMate from "ejs-mate";
import { ExpressError } from "./utils/ExpressError.ts";
import { detectLanguages } from "./utils/languageDetection.ts";

import reviews from "./routes/reviews.ts";
import campgrounds from "./routes/campgrounds.ts";

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
app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/yelp-camp")
	.then(() => console.log("Database connected"))
	.catch(err => console.error("Database connection error:", err));

// the bad way to verify passwords
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

app.post('/detect-language', (req: Request, res: Response) => {
	const input = req.body.text;
	const result = detectLanguages(input);
	res.json(result);
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