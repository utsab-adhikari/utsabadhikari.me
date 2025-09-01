import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: {
      type: String,
    },
    image: String,
    role: { type: String, enum: ["user", "admin",], default: "user" },
    badge: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
    },
    contact: {
      type: Number,
    },
    facebook: {
      type: String,
    },
    github: {
      type: String,
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpireesAt: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
