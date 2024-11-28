import express from "express";
import { connection } from "./schemas/userModel.js";
import router from "./routers/router.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server is running successfully. Click here for more info: \x1b[34mhttp://localhost:3000`
  );
});

connection();
