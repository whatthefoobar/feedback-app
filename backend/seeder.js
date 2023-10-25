import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Feedback from "./models/feedbackModel.js";
import feedbacks from "./FeedbackData.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Feedback.deleteMany();
    // const sampleFeedbacks = feedbacks.map((Feedback) => {
    //   return { ...Feedback };
    // });

    await Feedback.insertMany(feedbacks);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Feedback.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

// seed with node seeder.js / node seeder.js -d
