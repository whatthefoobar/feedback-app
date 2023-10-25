import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    // id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    rating: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
