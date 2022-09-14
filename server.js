const dotenv = require("dotenv");
const express = require("express");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const configureDB = require("./db/connect");
const mongoose = require("mongoose");
const { logEvents, logger } = require("./middleware/logger");
const productRoute = require("./routes/products");

// async errors
require("express-async-errors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;

// connection to the database
configureDB();

// middlewares
// middleware for formdata, cookie, others
app.use(express.json());
app.use(logger);

// products routes
app.use("/api/v1/products", productRoute);

// custom middlewares
app.use(notFound);
app.use(errorHandler);

// testing connection
mongoose.connection.once("open", () => {
  console.log(`MongoDB connection successful`);
  app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
  });
});
// testing disconnection
mongoose.connection.on("error", (error) => {
  logEvents(
    `${error.no}:${error.code}\t${error.syscall}\t${error.hostname}`,
    "mongoErrLog.log"
  );
  process.exit(1);
});
