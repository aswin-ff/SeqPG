import express from "express";
import {
  deleteEmployee,
  getAllEmployees,
  signup,
  updateEmployee,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/allEmp", getAllEmployees);
router.put("/emp/:empId", updateEmployee);
router.delete("/emp/:empId", deleteEmployee);

export default router;
