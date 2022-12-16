const joi = require("joi");

const authorAddSchema = joi.object({
  firstname: joi.string().max(255).trim().required(),
  lastname: joi.string().max(255).trim().optional(),
  dob: joi.date().greater("1-1-1900").less("1-1-2022").required(),
  country: joi.string().optional(),
  books: joi.array().items(joi.string()).optional(),
  createAt: joi.date().default(Date.now),
  lastUpdateAt: joi.date().default(Date.now),
});

const updateAuthorSchema = joi.object({
  firstname: joi.string().max(255).trim(),
  lastname: joi.string().max(255).trim(),
  dob: joi.date().min(1900).max(2022),
  country: joi.string(),
  books: joi.array().items(joi.string()),
  lastUpdateAt: joi.date().default(Date.now),
});

async function addAuthorValidationMW(req, res, next) {
  const authorPayload = req.body;

  try {
    await authorAddSchema.validateAsync(authorPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 406,
    });
  }
}

async function updateAuthorValidationMW(req, res, next) {
  const authorPayload = req.body;

  try {
    await updateAuthorSchema.validateAsync(authorPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 406,
    });
  }
}

module.exports = {
  addAuthorValidationMW,
  updateAuthorValidationMW,
};
