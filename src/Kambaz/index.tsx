import KambazNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

import QuizzesList from "./Courses/Quizzes/QuizzesList"; // ✅ 导入 Quiz List
import "./styles.css";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<{ _id?: string; name: string; description: string }>({
    name: "",
    description: "",
  });

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const addCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      setCourses([...courses, newCourse]);
      setCourse({ name: "", description: "" });
    } catch (e) {
      console.error("❌ Failed to create course:", e);
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (e) {
      console.error("❌ Failed to delete course:", e);
    }
  };

  const updateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      setCourses(courses.map((c) => (c._id === course._id ? course : c)));
      setCourse({ name: "", description: "" });
    } catch (e) {
      console.error("❌ Failed to update course:", e);
    }
  };

  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (e) {
      console.error("❌ Failed to fetch courses:", e);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="Account/*" element={<Account />} />
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    course={course}
                    setCourse={setCourse}
                    addCourse={addCourse}
                    updateCourse={updateCourse}
                    deleteCourse={deleteCourse}
                    courses={courses}
                    setCourses={setCourses}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route
              path="Courses/:cid/Quizzes"
              element={
                <ProtectedRoute>
                  <QuizzesList />
                </ProtectedRoute>
              }
            />
            <Route path="Calendar" element={<h1>Calendar</h1>} />
            <Route path="Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
