import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import creatorRoutes from "./routes/creatorRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/creators", creatorRoutes);
app.use("/images", imageRoutes);
app.use("/transactions", transactionRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
