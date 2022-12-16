const express = require("express");
const bodyParser = require("body-parser");
const CONFIG = require("./config/config");
const connectToDB = require("./db/mongodb");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const logger = require("./logger/logger");
const { requiresAuth } = require("express-openid-connect");
const authOMiddleware = require("./auth/auth0");

// Routers
const bookRouter = require("./routes/books.route");
const authorRouter = require("./routes/authors.route");

const app = express();

// connect to mongoDB
connectToDB();

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// AuthO
app.use(authOMiddleware);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Security middleware
app.use(helmet());

app.use("/api/v1/books", requiresAuth(), bookRouter);
app.use("/api/v1/authors", requiresAuth(), authorRouter);

app.get("/", (req, res) => {
  res.send("Hello Bookstore");
});

// Error handler midddleware
app.use((err, req, res, next) => {
  logger.error(err.message);

  const errorStatus = err.status || 500;

  res.status(errorStatus).send(err.message);
  next();
});

app.listen(CONFIG.PORT, () => {
  logger.info(`Server started on http://localhost:${CONFIG.PORT}`);
});
