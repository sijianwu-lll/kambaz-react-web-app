// src/Kambaz/Courses/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { courses as initialCourses } from "../Database";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: initialCourses,
    selectedCourse: null,
  },
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((c) => c._id !== action.payload);
    },
    updateCourse: (state, action) => {
      state.courses = state.courses.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
  },
});

export const {
  addCourse,
  deleteCourse,
  updateCourse,
  setSelectedCourse,
} = coursesSlice.actions;
export default coursesSlice.reducer;
