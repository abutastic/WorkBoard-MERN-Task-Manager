import express from "express";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import dotenv from "dotenv";
import rateLimiter from "../middleware/rateLimiter.js";
const app = express();
const PORT = process.env.PORT || 4007;
dotenv.config();

app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
});

//
