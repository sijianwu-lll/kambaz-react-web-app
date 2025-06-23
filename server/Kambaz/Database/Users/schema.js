import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String },  // ✅ 显式声明 _id 为字符串，兼容 uuid

    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, default: "" },

    dob: {
      type: Date,
      default: new Date("2000-01-01"),  // 默认出生日期
    },

    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
      default: "USER",
    },

    loginId: { type: String, default: "N/A" },
    section: { type: String, default: "S101" },
    lastActivity: {
      type: Date,
      default: Date.now,  // 默认当前时间
    },
    totalActivity: {
      type: String,
      default: "00:00:00",  // 默认活动时长
    },
  },
  { collection: "users" }
);

export default userSchema;
