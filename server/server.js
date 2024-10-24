import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import creatorRoutes from "./routes/creatorRoutes.js";

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

connectDB();
app.use("/register",creatorRoutes);
app.use("/login",creatorRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
