import Database from "../../index.js";
import { v4 as uuidv4 } from "uuid";

// ✅ 查询课程的所有模块
export function findModulesForCourse(courseId) {
  const { modules } = Database;
  return modules.filter((module) => module.course === courseId);
}

// ✅ 创建新模块
export function createModule(module) {
  const newModule = { ...module, _id: uuidv4() };
  Database.modules = [...Database.modules, newModule];
  return newModule;
}

// ✅ 删除指定模块
export function deleteModule(moduleId) {
  const { modules } = Database;
  Database.modules = modules.filter((module) => module._id !== moduleId);
  return 204;
}

// ✅ 更新指定模块
export function updateModule(moduleId, moduleUpdates) {
  const { modules } = Database;
  const module = modules.find((m) => m._id === moduleId);
  if (module) {
    Object.assign(module, moduleUpdates);
    return 204;
  } else {
    return 404;
  }
}
