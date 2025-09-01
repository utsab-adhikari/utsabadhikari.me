import mongoose from "mongoose";

const hiremeSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    contact: {
      type: String,
    },
    category: {
      type: String,
    },
    noOfEmployees: {
      type: String,
    },
    description: {
      type: String,
    },
    source: {
      type: String,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Hireme =
  mongoose.models.Hireme || mongoose.model("Hireme", hiremeSchema, "hiremes");

export default Hireme;
