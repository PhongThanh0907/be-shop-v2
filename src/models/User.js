import mongoose from "mongoose";

export const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: [true, "User name is required!"],
    },
    email: {
      type: String,
      require: [true, "Email is required!"],
      unique: true,
      min: [6, "Email must be at least 6 characters"],
      max: [50, "Email must be less then 50 characters"],
      match: [emailValid, "Please add a valid email"],
    },
    password: {
      type: String,
      require: [true, "Password is required!"],
      min: [6, "Password must be at least 6 characters"],
      max: [50, "Password must be less then 50 characters"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
      require: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
