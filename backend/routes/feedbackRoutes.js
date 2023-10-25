import express from "express";
const router = express.Router();
import {
  getFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";

// /api/feedbacks
router.route("/").get(getFeedbacks).post(createFeedback);

router
  .route("/:id")
  .get(getFeedbackById)
  .put(updateFeedback)
  .delete(deleteFeedback);

export default router;
