import express, { Application, NextFunction, Request, Response } from "express";
import methodOverride from "method-override";
import mongoose from "mongoose";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Campground } from "./models/campground.ts";

const app: Application = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

mongoose.connect("mongodb://localhost:27017/yelp-camp")
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('My first custom middleware runs!');
  return next(); // Continue to the next middleware or route handler
  console.log('If first middlewares next() has no return the code after runs when all other middelware is done')
});
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log('My second custom middleware runs!');
//   return next(); // return prevents it from running anything else.
// });
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log('My third custom middleware runs!');
//   return next();
// });

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan('tiny'))



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (_req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (_req: Request, res: Response) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds })
});

app.get("/campgrounds/new", (_req: Request, res: Response) => {
  res.render('campgrounds/new')
});
app.post('/campgrounds', async (req: Request, res: Response) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`campgrounds/${campground._id}`);
});

app.get("/campgrounds/:id", async (req: Request, res: Response) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/show', { campground });
});

app.get('/campgrounds/:id/edit', async (req: Request, res: Response) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/edit', { campground })
})

app.put('/campgrounds/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  if (campground) {
    res.redirect(`/campgrounds/${campground._id}`);
  } else {
    res.status(404).send("Campground not found");
  }
});

app.delete('/campgrounds/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');

})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});