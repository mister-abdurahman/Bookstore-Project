const express = require("express");
const bodyParser = require("body-parser");
const CONFIG = require("./config/config");
const connectToDB = require("./db/mongodb");

// Routers
const bookRouter = require("./routes/books.route");
const authorRouter = require("./routes/authors.route");

const app = express();

// connect to mongoDB
connectToDB();

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/authors", authorRouter);

app.get("/", (req, res) => {
  res.send("Hello Bookstore");
});

// Error handler midddleware
app.use((err, req, res, next) => {
  console.log(err);

  const errorStatus = err.status || 500;

  res.status(errorStatus).send(err.message);
  next();
});

app.listen(CONFIG.PORT, () => {
  console.log(`Server started on http://localhost:${CONFIG.PORT}`);
});
