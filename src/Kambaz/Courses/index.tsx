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

  const courses = useSelector((state: any) => state.coursesReducer.courses);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  const course = courses.find((course: any) => course._id === cid);
  const currentPage = pathname.split("/")[4] || "Home";

  // ✅ 验证用户是否已报名该课程
  const isEnrolled = enrollments.some(
    (e: any) => e.user === currentUser?._id && e.course === cid
  );

  if (!isEnrolled) {
    return <Navigate to="/Kambaz/Dashboard" />;
  }

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name} &gt; {currentPage}
      </h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>

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
