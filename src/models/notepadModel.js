import mongoose from "mongoose";

const notepadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    clipboard: {
      type: String,
    },
  },
  { timestamps: true }
);

const NotePad =
  mongoose.models.NotePad || mongoose.model("NotePad", notepadSchema);

export default NotePad;
