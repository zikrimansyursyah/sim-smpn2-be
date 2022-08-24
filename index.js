const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

const userController = require("./controllers/users.controller.js");
const mapelController = require("./controllers/mapel.controller.js");
const kelasController = require("./controllers/kelas.controller.js");
const { Validate } = require("./middleware");

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
app.get("/dashboard_data", userController.getDashboardAPI);
app.put("/user/update", userController.updateUserAPI);
app.post("/user/create", userController.createUserAPI);
app.post("/guru", userController.findAllTeachersAPI);
app.post("/siswa", userController.findAllStundetsAPI);
app.delete("/user/delete", userController.deleteUserAPI);

// Mapel Routes
app.get("/mapel", mapelController.getAllMapelAPI);

// Kelas Routes
app.get("/kelas", kelasController.getAllKelasAPI);

app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}`);
});
