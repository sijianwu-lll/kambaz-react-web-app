import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // ✅ 从服务器加载 assignment 时使用
    setAssignments: (state, { payload }) => {
      state.assignments = payload;
    },

    // ✅ 本地创建（通常不再用，除非新建时由客户端生成 ID）
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: uuidv4(),
        ...assignment,
      };
      state.assignments.push(newAssignment);
    },

    // ✅ 删除 assignment
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== assignmentId
      );
    },

    // ✅ 更新 assignment
    updateAssignment: (state, { payload: updated }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === updated._id ? updated : a
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
