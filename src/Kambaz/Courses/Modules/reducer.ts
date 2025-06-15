// src/Kambaz/Courses/Modules/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// ✅ 定义模块类型
type ModuleType = {
  _id: string;
  name: string;
  course: string;
  lessons?: any[];
  editing?: boolean;
};

type ModuleState = {
  modules: ModuleType[];
};

// ✅ 初始状态显式类型声明
const initialState: ModuleState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // ✅ 替换整个模块数组
    setModules: (state, { payload }) => {
      state.modules = payload;
    },

    // ✅ 添加模块
    addModule: (state, { payload: module }) => {
      const newModule: ModuleType = {
        _id: module._id || uuidv4(),
        name: module.name,
        course: module.course,
        lessons: module.lessons || [],
      };
      state.modules.push(newModule);
    },

    // ✅ 删除模块
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter((m) => m._id !== moduleId);
    },

    // ✅ 更新模块
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m) =>
        m._id === module._id ? module : m
      );
    },

    // ✅ 标记编辑状态
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
});

// ✅ 导出所有 action
export const {
  setModules,
  addModule,
  deleteModule,
  updateModule,
  editModule,
} = modulesSlice.actions;

export default modulesSlice.reducer;
