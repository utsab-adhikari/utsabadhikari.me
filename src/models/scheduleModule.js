import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  subTitle: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
});

const scheduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: [contentSchema],
  },
  { timestamps: true }
);

const Schedule =
  mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);

export default Schedule;
