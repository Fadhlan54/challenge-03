// internal module
const carRouter = require(`./routes/carRoutes`);
const appRouter = require(`./routes/appRoutes`);

// third-party module
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/", appRouter);
app.use("/cars", carRouter);

module.exports = app;
