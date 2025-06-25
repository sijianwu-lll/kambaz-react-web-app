import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    trim: true,
  },

  lastName: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
    trim: true,
  },

  dob: {
    type: Date,
  },

  role: {
    type: String,
    enum: ["FACULTY", "STUDENT", "ADMIN", "TA", "USER"],
    default: "USER",
  },

  loginId: {
    type: String,
  },

  section: {
    type: String,
  },

  lastActivity: {
    type: Date,
  },

  totalActivity: {
    type: String, // 格式如 "10:21:32"
  },
}, {
  timestamps: true,
});

export default mongoose.model("User", UserSchema);
