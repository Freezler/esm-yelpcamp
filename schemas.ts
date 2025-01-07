import joi from 'joi';

export const campgroundSchema = joi.object({
    campground: joi.object({
        title: joi.string(),
        price: joi.number().min(0),
        image: joi.string(),
        description: joi.string(),
        location: joi.string(),
        createdOn: joi.date().default(() => new Date())
    }).required()
});

export const reviewSchema = joi.object({
    review: joi.object({
        body: joi.string(),
        rating: joi.number().min(1).max(5)
    }).required()
});
campgroundSchema.validate({})
reviewSchema.validate({})

export default { campgroundSchema, reviewSchema };