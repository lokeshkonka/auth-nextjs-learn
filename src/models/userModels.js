import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true ,"Username is required"] },
  email: { type: String, required: [true ,"Email is required"], unique: true },
  password: { type: String, required: [true ,"Password is required"] },
  isverified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotpasswordToken: { type: String, default: "" },
  forgotpasswordTokenExpiry: { type: Date, default: null },
  verifyToken: { type: String, default: "" },
  verifyTokenExpiry: { type: Date, default: null }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
