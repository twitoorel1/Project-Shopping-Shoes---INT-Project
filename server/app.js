const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const globalErrorHandler = require("./controllers/globalErrorHandler");
const AppError = require("./utils/AppError");

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/shoe", require("./routes/shoe.route"));
app.use("/auth", require("./routes/auth.route"));
app.use("/brand", require("./routes/brand.route"));

app.all("*", (req, res, next) => {
  next(new AppError("Page Not Found", 400));
});

app.use(globalErrorHandler);

module.exports = app;
