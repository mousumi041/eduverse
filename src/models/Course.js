import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  category: String,
  subject: String,
  videos: [String]
});

const Course = mongoose.model("Course", courseSchema, "courses");

export default Course;