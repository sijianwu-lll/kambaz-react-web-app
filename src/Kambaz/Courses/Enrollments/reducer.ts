import { createSlice } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../../Database";

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState: {
    enrollments: initialEnrollments,
  },
  reducers: {
    enroll: (state, action) => {
      state.enrollments.push(action.payload);
    },
    unenroll: (state, action) => {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === user && e.course === course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
