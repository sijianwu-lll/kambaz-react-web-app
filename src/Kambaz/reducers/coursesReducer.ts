// src/Kambaz/reducers/coursesReducer.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [
    { _id: "123", name: "CS5610" },
    { _id: "234", name: "CS5200" },
  ],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    createCourse: (state, action) => {
      state.courses.push({ ...action.payload, _id: new Date().getTime().toString() });
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((c) => c._id !== action.payload);
    },
    updateCourse: (state, action) => {
      state.courses = state.courses.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
    },
  },
});

export const { createCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
