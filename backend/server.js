import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import FeedbackRoutes from "./routes/feedbackRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMidleware.js";
import cors from "cors";

const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/feedbacks", FeedbackRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  // if in production the frontend buikd is served from the published backend
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${port}`
  )
);
