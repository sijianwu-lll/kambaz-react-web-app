import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function Courses() {
  const { cid } = useParams();
  const { pathname } = useLocation();

  // ✅ 从 Redux 获取课程列表
  const courses = useSelector((state: any) => state.coursesReducer.courses);
  const course = courses.find((course: any) => course._id === cid);

  const currentPage = pathname.split("/")[4] || "Home";

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name} &gt; {currentPage}
      </h2>
      <hr />

      <div className="d-flex">
        {/* 左侧导航栏 */}
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
