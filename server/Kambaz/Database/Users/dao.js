import model from "./model.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // ✅ 新增：导入 uuid 用于生成自定义 ID

// ✅ 创建用户（使用 uuid 作为 _id 避免冲突）
export const createUser = (user) => {
  const userWithoutId = { ...user };
  delete userWithoutId._id;                      // 避免前端传入无效 _id
  const newUser = { _id: uuidv4(), ...userWithoutId }; // 强制生成合法字符串 _id
  return model.create(newUser);
};

// ✅ 查找所有用户
export const findAllUsers = () => model.find();

// ✅ 根据 ID 查找
export const findUserById = (userId) => {
  return model.findOne({ _id: userId });  // 直接使用字符串 ID，uuid 本来就是合法的字符串主键
};

// ✅ 根据用户名查找
export const findUserByUsername = (username) => model.findOne({ username });

// ✅ 查找用户名 + 密码匹配（例如登录验证）
export const findUserByCredentials = async (username, password) =>
  model.findOne({ username, password });

// ✅ 更新用户
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });

// ✅ 删除用户
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

// ✅ 根据角色查找用户
export const findUsersByRole = (role) => model.find({ role });

// ✅ 模糊匹配姓名查找用户（firstName 或 lastName）
export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i");
  return model.find({
    $or: [
      { firstName: { $regex: regex } },
      { lastName: { $regex: regex } },
    ],
  });
};
