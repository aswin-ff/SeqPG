import { User } from "../schemas/userModel.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { name, email, designation, empId, password } = req.body;

  if (!name || !email || !designation || !empId || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      designation,
      empId,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users.length) {
      return res.status(404).json({ message: "No users found." });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const updateEmployee = async (req, res) => {
  const empId = req.params.empId;
  try {
    const emp = await User.update(req.body, { where: { empId } });
    if (!emp) {
      return res.status(404).json({ message: "Employee not found." });
    }
    return res
      .status(200)
      .json({ message: "Employee data updated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteEmployee = async (req, res) => {
  const empId = req.params.empId;
  try {
    const emp = await User.findOne({ where: { empId } });
    if (!emp) {
      return res.status(404).json({ message: "Employee not found." });
    }

    await emp.destroy();
    return res
      .status(200)
      .json({ message: "Employee data deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
