const mongoose = require("mongoose");
const CONFIG = require("../config/config");
const logger = require("../logger/logger");

function connectToDB() {
  mongoose.set("strictQuery", false);

  mongoose.connect(CONFIG.MONGODB_URL);

  mongoose.connection.on("connected", () => {
    logger.info("mongodb connected succesfully");
  });

  mongoose.connection.on("error", (err) => {
    logger.info(err);
  });
}

module.exports = connectToDB;
