const express = require("express");
const {
  addAuthorValidationMW,
  updateAuthorValidationMW,
} = require("../validators/author.validator");
const authorController = require("../Controllers/author.controller");
const authorRouter = express.Router();

authorRouter.get("/", authorController.getAllAuthors);

authorRouter.get("/:id", authorController.getAuthorByID);

authorRouter.post("/", addAuthorValidationMW, authorController.addAuthor);

authorRouter.put(
  "/:id",
  updateAuthorValidationMW,
  authorController.updateAuthorByID
);

authorRouter.delete("/:id", authorController.deleteAuthor);

module.exports = authorRouter;
