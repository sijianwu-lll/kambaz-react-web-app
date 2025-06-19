// server/Kambaz/Database/Users/dao.js

import model from "./model.js";

// ✅ 创建用户（由 MongoDB 自动生成 _id，除非导入数据中已有）
export const createUser = (user) => model.create(user);

// ✅ 查找所有用户
export const findAllUsers = () => model.find();

// ✅ 根据 ID 查找
export const findUserById = (userId) => model.findById(userId);

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
