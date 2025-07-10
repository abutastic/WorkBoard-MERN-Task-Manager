import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimiter from "../middleware/rateLimiter.js";
const app = express();
const PORT = process.env.PORT || 4007;
dotenv.config();
const __dirname = path.resolve();

// middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);

// api routes
app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "production") {
  // deployment configuration
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); // tells serve dist folder as static files to backend

  // serve this if request comes to any other route, other than notesRoutes
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// connect to Database before starting the server for efficiency
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
});
