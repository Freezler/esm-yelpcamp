import Joi from 'joi';

export const campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().trim(),
        price: Joi.number().required().min(0).precision(2),
        image: Joi.string().required().uri(),
        location: Joi.string().required().trim(),
        description: Joi.string().required().trim().min(10).max(1000)
    }).required()
});