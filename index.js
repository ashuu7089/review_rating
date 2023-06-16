const express = require("express");
require("dotenv").config();
require("./models/config");
const app = express();
const mainRouter = require("./routers/mainRouter");

app.use(express.json());

app.use("/", mainRouter);

app.listen(9000, (req, res) => {
  console.log(`Server started successfully: ${process.env.port || 9000}`);
});
