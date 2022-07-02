const express = require("express");
const dotenv = require("dotenv");
const formidable = require("express-formidable");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

const userController = require("./controller/user.controller.js");
const { Validate, Authorize } = require("./middleware");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(formidable());
app.use(Validate);

// Auth Routes
app.post("/login", userController.login);
app.get("/", (req, res) => {
  res.json({ message: "Index running" });
});
// app.post("/validate-auth", userController.validateAuth);

// User Routes

app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}`);
});
