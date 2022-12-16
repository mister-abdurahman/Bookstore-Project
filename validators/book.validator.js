const joi = require('joi')

const BookAddSchema = joi.object({
    title: joi.string()
    .min(5)
    .max(255)
    .trim()
    .required(),
    shortDescription: joi.string()
    .min(5)
    .max(500)
    .trim()
    .optional(),
    longDescription: joi.string()
    .min(10)
    .trim()
    .optional(),
    isbn: joi.string()
    .min(10)
    .max(13)
    .required(),
    year: joi.number()
    .integer()
    .required()
    .max(2022),
    price: joi.number()
    .min(0)
    .required(),
    createdAt: joi.date()
    .default(Date.now),
    lastUpdateAt: joi.date()
    .default(Date.now)
})

const updateBookSchema = joi.object({
    title: joi.string()
    .min(5)
    .max(255)
    .trim(),
    shortDescription: joi.string()
    .min(5)
    .max(500)
    .trim(),
    longDescription: joi.string()
    .min(10)
    .trim(),
    isbn: joi.string()
    .min(10)
    .max(13),
    year: joi.number()
    .integer()
    .max(2022),
    price: joi.number()
    .min(0),
    lastUpdateAt: joi.date()
    .default(Date.now)
})

async function addBookValidationMW(req, res, next){
    const bookPayload = req.body

    try {
        await BookAddSchema.validateAsync(bookPayload)
        next()   
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 406
        })
    }
}

async function updateBookValidationMW(req, res, next){
    const bookPayload = req.body

    try {
        await updateBookSchema.validateAsync(bookPayload)
        next()   
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 406
        })
    }
}

module.exports = {
    addBookValidationMW,
    updateBookValidationMW
}