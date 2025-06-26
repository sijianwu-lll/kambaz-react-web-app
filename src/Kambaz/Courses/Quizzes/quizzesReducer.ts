import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Quiz } from "./types";

const initialState: { quizzes: Quiz[] } = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(q => q._id !== action.payload);
    },
    togglePublish: (state, action: PayloadAction<string>) => {
      const quiz = state.quizzes.find(q => q._id === action.payload);
      if (quiz) {
        quiz.published = !quiz.published;
      }
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      const index = state.quizzes.findIndex(q => q._id === action.payload._id);
      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  togglePublish,
  updateQuiz,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
