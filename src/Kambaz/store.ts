import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import coursesReducer from "./Courses/reducer";
import accountReducer from "./Account/reducer";
import enrollmentsReducer from "./Courses/Enrollments/reducer";
import quizzesReducer from "./Courses/Quizzes/quizzesReducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    coursesReducer,
    accountReducer,
    enrollmentsReducer, // ✅ 添加到 store
    quizzesReducer,
  },
});

export default store;
