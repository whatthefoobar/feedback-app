import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import FeedbackRoutes from "./routes/feedbackRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMidleware.js";
import cors from "cors";

const port = process.env.PORT || 5000;
// console.log(process.env.MONGO_URI);
connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/feedbacks", FeedbackRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${port}`
  )
);
