const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
dotenv.config();

const userController = require("./controllers/users.controller.js");
const { Validate, Authorize } = require("./middleware");

app.use(cors());
app.use(cookieParser());
app.use(formidable());
app.use(Validate);

// Landing Page
app.get("/", (req, res) => {
  res.json({ message: "Index running" });
});

// Auth Routes
app.post("/login", userController.login);
app.post("/validate-auth", userController.validateAuth);

// User Routes

app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}`);
});
