import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes } from "react-router";
import PeopleTable from "./People/Table";

export default function Courses() {
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        Course 1234
      </h2>
      <hr />

      <div className="d-flex">
        {/* 左侧导航栏，md以下隐藏 */}
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>

        {/* 右侧主内容区域 */}
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}
