import asyncHandler from "../middleware/asyncHandler.js";
import Feedback from "../models/feedbackModel.js";

// @desc    Fetch all Feedbacks
// @route   GET /api/feedbacks
// @access  Public
const getFeedbacks = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find({});

  res.json(feedbacks);
});
// const getFeedbacks = asyncHandler(async (req, res) => {
//   const pageSize = process.env.PAGINATION_LIMIT;
//   const page = Number(req.query.pageNumber) || 1;

//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: "i",
//         },
//       }
//     : {};

//   const count = await Feedback.countDocuments({ ...keyword });
//   const Feedbacks = await Feedback.find({ ...keyword })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1));

//   res.json({ Feedbacks, page, pages: Math.ceil(count / pageSize) });
// });

// @desc    Fetch single Feedback
// @route   GET /api/feedbacks/:id
// @access  Public
const getFeedbackById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const feedback = await Feedback.findById(req.params.id);
  if (feedback) {
    return res.json(feedback);
  } else {
    // NOTE: this will run if a valid ObjectId but no Feedback was found
    // i.e. Feedback may be null
    res.status(404);
    throw new Error("Feedback not found");
  }
});

// @desc    Create a Feedback
// @route   POST /api/feedbacks
// @access  Public
const createFeedback = asyncHandler(async (req, res) => {
  const feedback = new Feedback({
    rating: req.body.rating,
    text: req.body.text,
  });

  const createdFeedback = await feedback.save();
  res.status(201).json(createdFeedback);
});

// @desc    Update a Feedback
// @route   PUT /api/Feedbacks/:id
// @access  Public
const updateFeedback = asyncHandler(async (req, res) => {
  const { rating, text } = req.body;

  const feedback = await Feedback.findById(req.params.id);

  if (feedback) {
    feedback.rating = rating;
    feedback.text = text;

    const updatedFeedback = await feedback.save();
    res.json(updatedFeedback);
  } else {
    res.status(404);
    throw new Error("Feedback not found");
  }
});

// @desc    Delete a Feedback
// @route   DELETE /api/feedbacks/:id
// @access  Public
const deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (feedback) {
    await Feedback.deleteOne({ _id: feedback._id });
    res.json({ message: "Feedback removed" });
  } else {
    res.status(404);
    throw new Error("Feedback not found");
  }
});

export {
  getFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
