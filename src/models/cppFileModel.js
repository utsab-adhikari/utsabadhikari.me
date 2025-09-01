// models/cppFileModel.js
import mongoose from "mongoose";

const cppFileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    code: { type: String, required: true },
  },
  { timestamps: true }
);

const CppFile =
  mongoose.models.CppFile || mongoose.model("CppFile", cppFileSchema);

export default CppFile;
