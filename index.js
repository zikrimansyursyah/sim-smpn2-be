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
const nilaiController = require("./controllers/nilai.controller.js");
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
app.get("/dashboard_data", userController.getDashboardAPI);
app.put("/user/update", userController.updateUserAPI);
app.post("/user/create", userController.createUserAPI);
app.post("/guru", userController.findAllTeachersAPI);
app.post("/siswa", userController.findAllStundetsAPI);
app.delete("/user/delete", userController.deleteUserAPI);
app.get("/dropdown-guru", userController.findAllTeachersDropdownAPI);
app.post("/dropdown-siswa", userController.findAllStudentDropdownAPI);

// Mapel Routes
app.get("/mapel", mapelController.getAllMapelAPI);
app.post("/add-mapel", mapelController.createMapelAPI);
app.post("/add-pengajar", mapelController.createPengajarAPI);
app.put("/edit-pengajar", mapelController.updatePengajarAPI);
app.delete("/delete-pengajar", mapelController.deletePengajarAPI);
app.post("/get-all-pengajar", mapelController.getAllPengajarAPI);

// Kelas Routes
app.get("/kelas", kelasController.getAllKelasAPI);

// Nilai Routes
app.post("/nilai/khs", nilaiController.findUserKHSAPI);
app.post("/nilai/update-khs", Authorize, nilaiController.updateNilaiKHSAPI);
app.post("/nilai/dropdown-mapel-guru", nilaiController.findDropdownMapelKHSGuruAPI);
app.post("/nilai/khs-guru", nilaiController.findGuruKHSAPI);

app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}`);
});
