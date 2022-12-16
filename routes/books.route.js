const express = require('express')
const {addBookValidationMW, updateBookValidationMW} = require('../validators/book.validator')
const bookController = require('../Controllers/book.controller')
const bookRouter = express.Router()

bookRouter.get('/', bookController.getAllBooks)

bookRouter.get('/:id', bookController.getBookByID)

bookRouter.post('/', addBookValidationMW , bookController.addBook)

bookRouter.put('/:id', updateBookValidationMW, bookController.updateBookByID)

bookRouter.delete('/:id', bookController.deleteBook)


module.exports = bookRouter


