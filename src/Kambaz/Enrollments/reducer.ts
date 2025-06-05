// src/Kambaz/Enrollments/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../Database";

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState: {
    enrollments: initialEnrollments,
  },
  reducers: {},
});

export default enrollmentsSlice.reducer;
